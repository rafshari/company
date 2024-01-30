import SearchIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import styles from './SearchBar.module.css'

function SearchBar({value, setValue, locations, clearForm, searchLocation}) {
    return (
        <div className={styles.searchBar}>
            <form className={styles.searchform}>
                <input value={value} type="text" name="search" onChange={e => setValue(e.target.value)} placeholder='جستجوی شرکتهای حمل و نقل ...'/>
                <button type='submit'>
                    <SearchIcon className={styles.icon}/>
                </button>
                <CloseIcon className={styles.reset} onClick={clearForm}/>
            </form>
            <div className={styles.locations}>
                {locations && 
                locations.map( location => (
                    <div className={styles.location} onClick={searchLocation}>{location.place_name}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
