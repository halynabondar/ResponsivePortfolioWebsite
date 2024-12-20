import {Container, Row, Col} from 'react-bootstrap';
import {ArrowRightCircle} from 'react-bootstrap-icons';
import headerImg from '../assets/images/header-img.svg';
import {useEffect, useState} from "react";

export function Banner() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    function tick () {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => {
            clearInterval(ticker)
        };
    }, [text])

    return (
        <section className='banner' id='home'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <span className='tagline'>Welcome to my Portfolio!</span>
                        <h1>{`Hi, I'm webdecoded `}<span className="txt-rotate" dataPeriod="1000"
                                                         data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'><span
                            className='wrap'><br/>{text}</span></span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facilis fuga inventore
                            ipsum odio quaerat quam sed temporibus vero voluptas!</p>
                        <button onClick={() => console.log('connect')}>Let's connect <ArrowRightCircle size={25}/>
                        </button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt='Header Img'/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}