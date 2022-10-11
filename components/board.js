const Board = () => {
  const board = Array(10).fill().map((x,i) => {
    return Array(10).fill().map((y,idx) => idx)
  })
  const handleClick = (e) => {
    const id = e.target.getAttribute('data-id')
    console.log(id)
  }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Pick Your Squares</h2>
        <div className="grid grid-cols-10">
          { board.map((row, i) => (
            row.map((cell) => (
              <div
                key={`${i}:${cell}`}
                data-id={`${i}:${cell}`}
                onClick={handleClick}
                className="border border-sky-500 w-8 h-8 hover:bg-sky-500 cursor-pointer"
              >
                <div className="text-xs text-center pt-1">
                </div>
              </div>
            )
          )))}
        </div>

        <div className="card-actions justify-end mt-8">
          <button className="btn btn-secondary">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Board
