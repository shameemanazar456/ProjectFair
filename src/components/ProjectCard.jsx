import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import mediaPlayer from '../assets/mediaPlayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../services/baseUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
      <div className='m-md-5 m-sm-2 p-2 border rounded shadow'>
      <Card onClick={handleShow} className='border-0'  style={{ width: '350px' }}>
      <Card.Img variant="top" src={project?`${serverUrl}/uploads/${project.projectImage}`:mediaPlayer} className='' style={{
        
        height:'250px'}} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
        </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} sm={12}>
                    <img src={project?`${serverUrl}/uploads/${project.projectImage}`:mediaPlayer}height={'250px'}  alt="Project Image" className='w-100' />
                </Col>
                <Col md={6} sm={12}>
                    <h5>Description</h5>
                    <p>{project.overview}</p>
                    <h5>Technologies</h5>
                    <p>{project.language}</p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className='me-auto'>
            <Link to={project.github} target='_blank'>
            <FontAwesomeIcon icon={faGithub} className='fa-2x' />
            </Link>
            <Link to={project.website} target='_blank'>
            <FontAwesomeIcon icon={faLink} className='fa-2x' />
            </Link>

         
        </Modal.Footer>
      </Modal>

      </div>
    </>
  )
}

export default ProjectCard
