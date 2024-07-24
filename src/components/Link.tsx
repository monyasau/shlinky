const Link=({id, url,platform})=> {
    return (
        <div className="p-5 rounded-xl bg-[#FAFAFA]">
            <div className="flex"aria-label="top bar">

           <div> <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="12" height="1" fill="#737373"/>
<rect y="5" width="12" height="1" fill="#737373"/>
</svg> Link #{id}</div>
<span>Remove</span>

            </div>
            {url}

        </div>
    );
}

export default Link;