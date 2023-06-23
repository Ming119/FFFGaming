
export const FloatingLabel = (props) => {
    return (
    <div className='form-floating my-3'>
        <input className="form-control" placeholder={ props.label } { ...props } />
        <label className="form-label" htmlFor={ props.id }>{ props.label }</label>
    </div>
    );
};

export default FloatingLabel;