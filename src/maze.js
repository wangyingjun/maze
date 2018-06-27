import {random} from './until'
/*
 * 生成迷宫数据类
 * 原理：Prim
 * 1.让迷宫全是墙.
 * 2.选一个单元格作为迷宫的通路，然后把它的邻墙放入列表
 * 3.当列表里还有墙时
 *     1.从列表里随机选一个墙，如果这面墙分隔的两个单元格只有一个单元格被访问过
 *         1.那就从列表里移除这面墙，即把墙打通，让未访问的单元格成为迷宫的通路
 *         2.把这个格子的墙加入列表
 *     2.如果墙两面的单元格都已经被访问过，那就从列表里移除这面墙
 */
class Maze {
    constructor(opt){
        this.row = opt.row;
        this.col = opt.col;
        this.generate();
    }
    generate(){
        this.mazeData = [];
        //记录轨迹
        this.track = [];
        for(let row = 0; row < this.row*2 + 1; row++){
            let rowData = [];
            for(let col = 0; col < this.col*2 + 1; col++){
                if (col % 2 === 0 || row % 2 === 0) {
                    //墙
                    rowData.push({
                        value: 0,
                        row: row,
                        col: col
                    });
                } else {
                    rowData.push({
                        value: 1,
                        isVisited: false,
                        row: row,
                        col: col
                    });
                }
            }
            this.mazeData.push(rowData)
        }
        let current = this.mazeData[2 * random(this.col) + 1][2 * random(this.row) + 1];
        current.isVisited = true;

        let visitedList = [];
        visitedList.push(current);
        while(current.isVisited){

            let north = (current.col - 2) >= 0 ? this.mazeData[current.row][current.col - 2] : {isVisited: true},
                east = (current.row + 2) < (this.row * 2 + 1) ? this.mazeData[current.row + 2][current.col] : {isVisited: true},
                south = (current.col + 2) < (this.col * 2 + 1) ? this.mazeData[current.row][current.col + 2] : {isVisited: true},
                west = (current.row - 2) >= 0 ? this.mazeData[current.row - 2][current.col] : {isVisited: true};

            let nearbyList = [];
            !north.isVisited && nearbyList.push(north);
            !east.isVisited && nearbyList.push(east);
            !south.isVisited && nearbyList.push(south);
            !west.isVisited && nearbyList.push(west);

            if(nearbyList.length !== 0){
                let nearby = nearbyList[random(nearbyList.length)];
                let breakWall = this.mazeData[(nearby.row + current.row) / 2][(nearby.col + current.col) / 2];
                breakWall.value = 1;

                this.track.push(breakWall);

                nearby.isVisited = true;
                visitedList.push(nearby);
                current = nearby;
            }else{
                let randomIndex = random(visitedList.length);
                current = visitedList[randomIndex];
                if(!current){
                    break;
                }
                current.isVisited = true;
                visitedList.splice(randomIndex, 1)
            }
        }
    }
    getData(){
        return this.mazeData;
    }
    getGenTrack(){
        return this.track;
    }
}

export default Maze