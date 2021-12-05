import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './AppBarSearchUtils';

export default function AppBarSearch (props) {
    const inputRef = useRef(null);

    const onInputChange = (event) => {
        event.preventDefault();
        console.log('AppbarSearch event change', inputRef.current);

        if (!inputRef.current.value) return;
        props.setSearchInput(inputRef.current.value);
    };

    return (
        <form onSubmit={onInputChange}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search', ref: inputRef }}
                    // ref={inputRef}
                />
            </Search>
        </form>
    );
}