import Maze from 'Maze';

class mazeMap extends Maze{
    constructor(opt){
        super(opt)
    }
    render(){
        let text = '<table>';
        this.mazeData.forEach(item => {
            text += '<tr>';
            item.forEach(cell => {
                let className =  cell.value ?  '' : 'wall';
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
maze.renderGenTrack();