import Maze from 'Maze';

class mazeMap extends Maze{
    constructor(opt){
        super(opt);
        this.start = [];
        this.end = [];
    }
    /*
     * findPath 寻找路径
     * 1. 起点入栈
     * 2. 遍历栈首
     *      1.
     */
    setStart(point){
        this.start = point
    }
    setEnd(point){
        this.end = point;
    }
    findPath(){
        //this.start = [];
        //this.end = [];
        // 重置所有路径的访问
        this.mazeData.forEach( col => {
            col.forEach(cell => {
                cell.isVisited = false;
                cell.pre = null;
            })
        });
        this.path = [];
        let start = this.mazeData[this.start[0]][this.start[1]],
            queue = [];
        start.isVisited = true;
        queue.unshift(start);

        while (queue.length){
            let current = queue.shift(),
                nearby = [];
            // 遍历当前cell的四周可访问的cell
            let north = (current.col - 1) >= 0 ? this.mazeData[current.row][current.col - 1] : null,
                east = (current.row + 1) < (this.row * 2 + 1) ? this.mazeData[current.row + 1][current.col] : null,
                south = (current.col + 1) < (this.col * 2 + 1) ? this.mazeData[current.row][current.col + 1] : null,
                west = (current.row - 1) >= 0 ? this.mazeData[current.row - 1][current.col] : null;

            if(north && north.value && !north.isVisited){
                nearby.push(north);
                north.pre = [current.row, current.col]
            }
            if(east && east.value && !east.isVisited){
                nearby.push(east);
                east.pre = [current.row, current.col]
            }
            if(south && south.value && !south.isVisited){
                nearby.push(south);
                south.pre = [current.row, current.col]
            }
            if(west && west.value && !west.isVisited){
                nearby.push(west);
                west.pre = [current.row, current.col]
            }

            nearby.forEach( cell => {
                cell.isVisited = true;
                queue.push(cell)
            });

            let first = queue[0];
            if(first && first.row === this.end[0] && first.col === this.end[1]){
                this.pre = first;
                break;
            }
        }
        let item = this.pre;
        while(item.pre){
            this.path.unshift([item.pre[0], item.pre[1]]);
            // 生成路径数组，path[0]为起点坐标
            item = this.mazeData[item.pre[0]][item.pre[1]];
        }
    }
    renderPath(){
        this.render();
        if(this.start[0] && this.end[0]){
            this.findPath();
            this.path.forEach(cell => {
                let tr = document.querySelectorAll('tr')[cell[0]].querySelectorAll('td')[cell[1]];
                tr.classList.add('path')
            })
        }

    }
    render(){
        let text = '<table>';
        this.mazeData.forEach(item => {
            text += '<tr>';
            item.forEach(cell => {
                // 墙
                let className =  cell.value ?  '' : 'wall';
                if(cell.row % 2 === 0){
                    className += ' wall-horizontal';
                }

                if(cell.col % 2 === 0){
                    className += ' wall-vertical';
                }
                // 开始点
                if(this.start[0] && cell.row === this.start[0] && cell.col === this.start[1]){
                    className += ' point'
                }
                // 结束点
                if(this.end[0] && cell.row === this.end[0] && cell.col === this.end[1]){
                    className += ' point'
                }
                //

                text += '<td class="'+className+'"></td>'
            });
            text += '</tr>';
        });
        text += '</table>';
        document.querySelector('#app').innerHTML = text;
    }
    renderGenTrack(){
        let text = '<table>';
        for(let row = 0; row < this.row*2 + 1; row++){
            text += '<tr>';
            for(let col = 0; col < this.col*2 + 1; col++){

                let className = (col % 2 === 0 || row % 2 === 0) ?  'wall' : '';
                text += '<td class="'+className+'"></td>'
            }
            text += '</tr>';
        }
        text += '</table>';
        document.querySelector('#app').innerHTML = text;

        let currentIndex = 0,
            trackList = this.track;
        let timer = setInterval(()=>{
            let cur = trackList[currentIndex],
                row = cur.row,
                col = cur.col;
            document.querySelectorAll('tr')[row].querySelectorAll('td')[col].classList.remove('wall');
            currentIndex++;
            if(currentIndex >= trackList.length){
                clearInterval(timer)
            }
        }, 100)
    }
}

let maze = new mazeMap({
    row: 10,
    col: 10
});
maze.render();
// maze.renderGenTrack();
// maze.renderPath();


let app = document.querySelector('#app'),
    start = [], end = [];
app.addEventListener('click', function(e){
    let target = e.target;
    let col = target.cellIndex,
        row = target.parentNode.rowIndex;
    if(row%2 === 0 || col%2===0){
        e.stopPropagation();
        return;
    }
    if(start[0] && !end[0]){
        end = [row, col];
    }else if(start[0] && end[0] || !start[0]){
        maze.render();
        start = [row, col];
        end = []
    }
    maze.setStart(start);
    maze.setEnd(end);
    maze.renderPath();

});
let isAni = false,
    aniCls = 'ani',
    appDom = document.querySelector('#app');
document.querySelector('#changeWall').addEventListener('click', function(){
    if(isAni){
        appDom.classList.remove(aniCls)
    }else{
        appDom.classList.add(aniCls)
    }
    isAni = !isAni;
});
