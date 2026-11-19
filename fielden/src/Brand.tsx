export function FieldenMark({word=true}:{word?:boolean}){
 return <svg className={word?'brand-lockup':'brand-symbol'} viewBox={word?'0 0 382 64':'0 0 64 64'} role="img" aria-label="FIELDEN"><g fill="currentColor"><path d="M0 0h64v64H0z"/><path d="M13 16h38L41 26H24v8h17L31 44h-7v9H13z" fill="var(--brand-cut,#f1f2e9)"/>{word&&<g transform="translate(78 7)"><path d="M0 0h35v10H11v12h20v10H11v18H0zM45 0h11v50H45zM66 0h35v10H77v10h21v10H77v10h24v10H66zM111 0h11v40h25v10h-36z"/><path fillRule="evenodd" d="M157 0h20q24 0 24 25t-24 25h-20zm11 10v30h9q13 0 13-15t-13-15z"/><path d="M211 0h35v10h-24v10h21v10h-21v10h24v10h-35zM256 50V0h11l20 30V0h11v50h-11l-20-30v30z"/></g>}</g></svg>;
}
export function Cross(){return <span className="brand-cross" aria-hidden="true">+</span>}

