
export const FloatingLabel = (props) => {
    const { textarea } = props;

    return (
    <div className='form-floating my-3'>
        { textarea ?
            <textarea className="form-control" 
                placeholder={ props.label } { ...props } />
        :   <input className="form-control" 
                placeholder={ props.label } { ...props } /> }
        
        <label className="form-label" htmlFor={ props.id }>{ props.label }</label>
    </div>
    );
};

export default FloatingLabel;