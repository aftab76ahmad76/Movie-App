const GenreList = ({genres, handleGenre, valueProperty, selectedGenre}) => {
    return (
        <ul className="list-group">
            <li
                 className={selectedGenre == 'All' ?'list-group-item py-4 cursor active' : 'list-group-item py-4 cursor'}
                onClick={() => handleGenre('All')}
            >
                {'All genres'}
            </li>
            {
                genres.map(g => (
                    <li
                        className={selectedGenre == g ?'list-group-item py-4 cursor active' : 'list-group-item py-4 cursor'}
                        onClick={() => handleGenre(g)}
                        key={g[valueProperty]}
                    >
                        {g.name}
                    </li>
                ))
            }
        </ul>
    )
}
GenreList.defaultProps ={
    textProperty:'name',
    valueProperty:'_id'
}
export default GenreList
