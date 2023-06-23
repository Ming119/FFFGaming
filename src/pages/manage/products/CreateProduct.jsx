import { useEffect, useState, useRef } from 'react';
import { Form, Link } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { PlusSquare, PlusSquareDotted } from 'react-bootstrap-icons';
import { Row, Col, Card, CloseButton, Button, Image, OverlayTrigger, Popover, ListGroup, Accordion } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreateProduct = () => {
	const [coverImageDataURL, setCoverImageDataURL] = useState();
	const [imagesDataURL, setImagesDataURL] = useState([]);
	const [richText, setRichText] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const quillRef = useRef();

	const handleImagechange = (setImage) => {
		const fileInput = document.createElement('input');

		fileInput.type = 'file';
		fileInput.name = 'image';
		fileInput.accept = 'image/*';
		fileInput.onchange = (e) => {
			const file = e.target.files[0];

			if (!file.type.match(/image\/(png|jpg|jpeg)/i)) {
				alert('請上傳圖片檔案');
				return;
			}

			const fileDataURLReader = new FileReader();
			fileDataURLReader.onload = (e) => {
				setImage(e.target.result);
			};
			fileDataURLReader.readAsDataURL(file);
		}
		fileInput.click();
	};

	const onCoverImageClick = _ => handleImagechange(setCoverImageDataURL);

	const onAddImageClick = _ => {
		handleImagechange(imageDataURL => setImagesDataURL(prev => [...prev, imageDataURL]))
	};

	const onAddAttributeClick = _ => {
		setAttributes(prev => [...prev, { name: '', options: ['', ''] }]);
	};

	const removeImage = index => {
		setImagesDataURL(prev => {
			const newImagesDataURL = [...prev];
			newImagesDataURL.splice(index, 1);
			return newImagesDataURL;
		});
	};

	const removeAttribute = index => {
		setAttributes(prev => {
			const newAttributes = [...prev];
			newAttributes.splice(index, 1);
			return newAttributes;
		});
	};

	const onAttributeNameChange = (index, value) => {
		setAttributes(prev => {
			const newAttributes = [...prev];
			newAttributes[index].name = value;
			return newAttributes;
		});
	};

	const onAttributeOptionChange = (index, optionIndex, value) => {
		setAttributes(prev => {
			const newAttributes = [...prev];
			newAttributes[index].options[optionIndex] = value;
			return newAttributes;
		});
	};

	const onAddOptionClick = (e, index) => {
		setAttributes(prev => {
			const newAttributes = [...prev];
			newAttributes[index].options.push('');
			return newAttributes;
		});
	};

	const quillImageHandler = _ => {
		var range = quillRef.current.getEditor().getSelection();
		var value = prompt('What is the image URL');
		if (value)
			quillRef.current.getEditor().insertEmbed(range.index, 'image', value, 'user');
	}

	useEffect(_ => {
		sessionStorage.setItem('coverImage', coverImageDataURL);
		sessionStorage.setItem('images', JSON.stringify(imagesDataURL));
	}, [coverImageDataURL, imagesDataURL]);

	useEffect(_ => {
		sessionStorage.setItem('richText', richText);
	}, [richText]);

	return (
		<div className="add-product">
			<Row className="my-3">
				<Col xs={2}>
					<Button variant="outline-primary" size="sm" as={Link} to=".." className='my-3'>
						<CaretLeftFill />返回
					</Button>
				</Col>
				<Col xs={8}>
					<Card>
						<Card.Body>
							<Card.Title className='text-center fs-1 fw-bold'>新增商品</Card.Title>
							<hr />
							<Form method='POST'>
								<Row className='my-3'>
									{coverImageDataURL ? (
										<Col xs={2}>
											<OverlayTrigger trigger="click"
												overlay={
													<Popover>
														<Popover.Body className='p-1'>
															<ListGroup variant="flush">
																<ListGroup.Item action onClick={onCoverImageClick}>更換圖片</ListGroup.Item>
															</ListGroup>
														</Popover.Body>
													</Popover>
												}>
												<Image src={coverImageDataURL} fluid rounded />
											</OverlayTrigger>
										</Col>
									) : (
										<Col xs={2}>
											<PlusSquare size="100%" onClick={onCoverImageClick} />
										</Col>
									)}

									{imagesDataURL.map((imageDataURL, index) => (
										<Col xs={2} key={index}>
											<OverlayTrigger trigger="click"
												overlay={
													<Popover>
														<Popover.Body className='p-1'>
															<ListGroup variant="flush">
																<ListGroup.Item action onClick={() => removeImage(index)}>移除圖片</ListGroup.Item>
															</ListGroup>
														</Popover.Body>
													</Popover>
												}>
												<Image src={imageDataURL} fluid rounded />
											</OverlayTrigger>
										</Col>
									))}

									<Col xs={2}>
										<PlusSquareDotted size="100%" onClick={onAddImageClick} />
									</Col>
								</Row>

								<FloatingLabel type="text" name="productName" id="productName" label="商品名稱" />

								<Row className='my-3'>
									<Col>
										<FloatingLabel type="number" name="price" id="price" label="價格" />
									</Col>
									{/* <Col>
										<FloatingLabel type="number" name="countInStock" id="countInStock" label="庫存" />
									</Col> */}
								</Row>

								<ReactQuill ref={quillRef}
									theme="snow"
									modules={{
										toolbar: {
											container: [
												['bold', 'italic', 'underline', 'strike'],        // toggled buttons
												['blockquote', 'code-block'],

												[{ 'list': 'ordered' }, { 'list': 'bullet' }],
												[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
												[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
												[{ 'direction': 'rtl' }],                         // text direction

												[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
												[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

												[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
												[{ 'font': [] }],
												[{ 'align': [] }],

												['clean'],                                         // remove formatting button
												['image', 'video']
											],
											handlers: {
												image: quillImageHandler,
											}
										}
									}}
									value={richText}
									onChange={setRichText} />

								<Accordion className='my-3'>
									{attributes.map((attribute, index) => (
										<Accordion.Item eventKey={index} key={index}>
											<Accordion.Header><CloseButton onClick={() => removeAttribute(index)} /> 屬性 #{index + 1}</Accordion.Header>
											<Accordion.Body>
												<Row>
													<Col>
														<FloatingLabel type="text" name="attributeName" label="屬性名稱"
															onChange={(e) => onAttributeNameChange(index, e.target.value)} />
													</Col>
												</Row>
												<Row>
													{attribute.options.map((option, optionIndex) => (
														<Col xs={12} lg={6} key={optionIndex}>
															<FloatingLabel type="text" name={`attributeValues_${attributes[index].name}`} label="屬性值"
																onChange={(e) => onAttributeOptionChange(index, optionIndex, e.target.value)} />
														</Col>
													))}
												</Row>
												<Row>
													<Col>
														<Button type="button" onClick={(e) => onAddOptionClick(e, index)}>增加選項</Button>
													</Col>
													<Col>
														<div className="form-check">
															<input className="form-check-input" type="radio" name="correspondingImage" id={`correspondingImage_${attributes[index].name}`} value={attributes[index].name} />
															<label className="form-check-label" htmlFor={`correspondingImage_${attributes[index].name}`}>
																對應圖片
															</label>
														</div>
													</Col>
												</Row>

											</Accordion.Body>
										</Accordion.Item>
									))}
								</Accordion>

								<Row className='mx-auto my-3'>
									<Button type="button" variant='primary' onClick={onAddAttributeClick}>增加屬性</Button>
								</Row>

								<Row className='mx-auto my-3'><Button variant='success' type='submit'>新增</Button></Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={2} />
			</Row>
		</div>
	);
};

export default CreateProduct;
