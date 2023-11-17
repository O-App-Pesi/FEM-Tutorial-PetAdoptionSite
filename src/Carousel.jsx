import { Component } from "react";


//no hooks allowed!!!
class Carousel extends Component {
    state = { 
        active: 0
     };
     static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
     };

     //arrow functions do not create new scope
     handleIndexClick = (e) => {
        this.setState({
            active: e.target.dataset.index
        })
     }

     render () {
        const { active } = this.state
        const { images } = this.props

        return (
           <div className="carousel">
               <img src={images[active]} alt="animal" />
                <div className='carousel-smaller'>
                    {images.map((photo, index) =>
                        <img 
                            onClick={this.handleIndexClick}
                            data-index={index}
                            key={photo}
                            src={photo}
                            className={index === active ? "active": ""}
                            alt="animal thumbnail"
                        />    
                    )}
                </div>
           </div>
     )
     }
}
 
export default Carousel;