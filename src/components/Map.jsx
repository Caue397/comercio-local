import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react';
import { BsGeoAltFill } from "react-icons/bs";
import ProductCard from './ProductCard';
import { Container } from 'reactstrap';
const token = import.meta.env.VITE_MAPBOX_TOKEN

export default function Map({ viewport, setViewport, filteredProductsData }) {
    const [ selectedProduct, setSelectedProduct ] = useState(null);
    const [ selectedMarker, setSelectedMarker ] = useState(false)

    const handleMarkerClick = (ev, product) => {
        ev.preventDefault()
        setSelectedProduct(product)
        if (selectedMarker) {
            selectedMarker.classList.remove('active')
            setSelectedMarker(ev.target)
            ev.target.classList.add('active')
        } else {
            setSelectedMarker(ev.target)
            ev.target.classList.add('active')
        }
    }

    return (
        <Container 
        className="map-container" 
        style={{
                width: '100vw', 
                height: '80vh', 
                paddingBottom: '10vh',
            }}>
            <ReactMapGl 
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
                mapboxAccessToken={token} 
                mapStyle="mapbox://styles/mapbox/light-v11"
                >
                    {filteredProductsData.map(product => (
                        <Marker
                            key={product._id}
                            anchor='bottom'
                            latitude={product.location.coordinates[1]}
                            longitude={product.location.coordinates[0]}
                         >
                            <button 
                                className='marker-btn'
                                onClick={ev => handleMarkerClick(ev, product)}
                            >
                                <BsGeoAltFill />
                            </button>
                         </Marker>
                    ))}

                    {selectedProduct ? (
                        <Popup
                            className='map-popup'
                            anchor="top"
                            closeOnClick={false}
                            onClose={() => {
                                setSelectedProduct(null)
                                selectedMarker.classList.remove('active')
                            }
                            }
                            latitude={selectedProduct.location.coordinates[1]}
                            longitude={selectedProduct.location.coordinates[0]}
                        >
                            <ProductCard
                                productImg={{ 
                                    src: '',
                                    alt: ''
                                }}
                                title={selectedProduct.name}
                                price={selectedProduct.price}
                                name={selectedProduct.user.name}
                                whatsapp={selectedProduct.user.whatsapp}
                            />
                        </Popup>
                    )
                    : null }
                    
            </ReactMapGl>
        </Container>
    )
}