
export const FloatingLabel = ({ type, id, name, label, value, onChange, textarea }) => {

    return (
    <div className='form-floating my-3'>
        { textarea ?
            <textarea className="form-control" type={ type }
                id={ id } name={ name } value={ value }
                placeholder={ label } onChange={ onChange } />
        :   <input className="form-control" type={ type }
                id={ id } name={ name } value={ value }
                placeholder={ label } onChange={ onChange } /> }
        
        <label className="form-label" htmlFor={ id }>{ label }</label>
    </div>
    );
};

export default FloatingLabel;