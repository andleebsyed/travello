export function ShowPost() {
    return (
        <main className="p-4 border border-red-800 col-start-2 col-end-3 row-start-2 row-end-3 flex">
            <img alt="avatar" src="https://via.placeholder.com/48" className="rounded-3xl w-12 h-12  " />
            <section className="pl-4">
                <div className="flex justify-between">
                    <div>
                        <span>Syed Andleeb</span>
                        <span> @andleeb_dev</span>
                    </div>
                    
                    <button className="self-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z" fill="rgba(149,164,166,1)"/></svg></button>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium, dui sed efficitur condimentum, est justo tempus eros, id facilisis metus enim quis lorem. Nam auctor aliquam tellus ut tempor. Quisque commodo fringilla facilisis. Donec in orci id odio aliquam feugiat. Proin tempus facilisis iaculis. Aenean condimentum sagittis risus, sit amet mollis odio tincidunt eget. Sed consectetur fringilla vestibulum. Ut congue dictum purus, vel congue velit ullamcorper ultricies. Vivamus tristique dui eget lacinia vehicula. Cras viverra porttitor purus, id tristique dolor. Integer sed metus lectus. Duis tristique orci vitae hendrerit ornare. Praesent gravida consectetur maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas porttitor euismod est non imperdiet. Suspendisse at nibh at tellus egestas sodales sit amet nec eros.
                </p>
                <footer className="flex justify-start pt-4">
                    <button className=" w-6 h-6 pr-32"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" fill="rgba(149,164,166,1)"/></svg></button>
                    <button className=" w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z" fill="rgba(149,164,166,1)"/></svg></button>
                </footer>
            </section>
            
            
        </main>
    )
}