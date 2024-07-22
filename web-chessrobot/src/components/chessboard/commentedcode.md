
    // function grabPiece(e: React.MouseEvent){
    //     const chessBoard = chessBoardRef.current;
    //     const target = e.target as HTMLElement;
    //     if(target.classList.contains('chess-piece') && chessBoard){
    //         const gridX = Math.floor((e.clientX - chessBoard.offsetLeft) / 100);
    //         const gridY = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100));
    //         setGridX(gridX);
    //         setGridY(gridY);

    //         const x = e.clientX - 50;
    //         const y = e.clientY - 50;
    //         target.style.position = 'absolute';
    //         target.style.left = `${x}px`;
    //         target.style.top = `${y}px`;
    
    //         setActivePiece(target);
    //     }
    // }
    
    // function movePiece(e: React.MouseEvent){
    //     const chessBoard = chessBoardRef.current;
    //     if(activePiece && chessBoard){
    //         const minX = chessBoard.offsetLeft - 25;
    //         const minY = chessBoard.offsetTop - 25;
    //         const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
    //         const maxY = chessBoard.offsetTop + chessBoard.clientHeight - 75;
    //         const x = e.clientX - 50;
    //         const y = e.clientY - 50;
            
    //         if(x < minX){
    //             activePiece.style.left = `${minX}px`;
    //         } else if(x > maxX){
    //             activePiece.style.left = `${maxX}px`;
    //         } else {
    //             activePiece.style.left = `${x}px`;
    //         }

    //         if(y < minY){
    //             activePiece.style.top = `${minY}px`;
    //         } else if(y > maxY){
    //             activePiece.style.top = `${maxY}px`;
    //         } else {
    //             activePiece.style.top = `${y}px`;
    //         }
    //     }
    // }

    // function dropPiece(e: React.MouseEvent){
    //     const chessBoard = chessBoardRef.current;

    //     if(activePiece && chessBoard){
    //         const x = Math.floor((e.clientX - chessBoard.offsetLeft) / 100);
    //         const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100));
    //         console.log(x, y);
    //         setPieces((value) => {
    //         const pieces = value.map(p => {
    //             if(p.x === gridX && p.y === gridY){
    //                 p.x = x;
    //                 p.y = y;
    //             }
    //             return p;       
    //     });
    //     return pieces;
    //     });
    //     setActivePiece(null);
    // }}


    // onMouseUp={e=> dropPiece(e)} 
        // onMouseMove={e => movePiece(e)} 
        // onMouseDown={e => grabPiece(e)} 

       // const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    // const [gridX, setGridX] = useState(0);
    // const [gridY, setGridY] = useState(0);