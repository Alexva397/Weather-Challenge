
const Header = ({ searchValue, onChange, handleSubmit }) => {
    return (
        <header className="App-header">
            <h1 className="title">Weather</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="search"
                    placeholder="Search by city..."
                    type="text"
                    name="search"
                    value={searchValue}
                    onChange={onChange}
                />
                <button className="submit" type="submit">Search</button>
            </form>
        </header>
    );
};

export default Header;