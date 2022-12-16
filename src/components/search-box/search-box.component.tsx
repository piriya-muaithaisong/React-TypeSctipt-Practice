import './search-box.styles.css'
import { ChangeEvent } from 'react';

type SearchBoxProps = {
    className: string;
    placeholder?: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps) => (
    <div>
        <input className={`search-box ${className}`} type='search' placeholder={placeholder} onChange={onChangeHandler} />
    </div>
);

export default SearchBox;