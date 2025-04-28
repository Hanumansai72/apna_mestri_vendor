import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import "./Techincal.css";

function TechnicalNonDashboard() {
    const [locationName, setLocationName] = useState("Fetching location...");
    const [distance, setDistance] = useState(null);  

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; 
        return distance;
    }

    async function getCoordinatesFromCity(cityName) {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${cityName}&state=Telangana&country=India&format=json&addressdetails=1`);
            const cityData = response.data[0];
            
            if (cityData) {
                const lat = parseFloat(cityData.lat);
                const lon = parseFloat(cityData.lon);
                return { lat, lon };
            } else {
                throw new Error("City not found");
            }
        } catch (error) {
            console.error("Error getting coordinates:", error);
            return null;
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const res = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const name = res.data.address.city || res.data.address.town || res.data.address.village || "Your Area";
                        setLocationName(name);

                        const destinationCity = "uppal";
                        const destination = await getCoordinatesFromCity(destinationCity);

                        if (destination) {
                            const calculatedDistance = calculateDistance(latitude, longitude, destination.lat, destination.lon);
                            setDistance(calculatedDistance);  
                            console.log(`Distance from your location to ${destinationCity}: ${calculatedDistance.toFixed(2)} km`);
                        } else {
                            console.log("Couldn't retrieve destination coordinates.");
                        }

                    } catch (error) {
                        console.error("Error fetching location name", error);
                        setLocationName("Location unavailable");
                    }
                },
                (error) => {
                    console.error("Location error:", error);
                    setLocationName("Permission denied");
                }
            );
        } else {
            setLocationName("Geolocation not supported");
        }
    }, []);

    return (
        <div>
            <Navbar locationName={locationName} />

            <div className="cards-container">
                <div className="cards">
                    <span className='span-text'>New Jobs</span>
                    <h3 className='short-text'>12</h3>
                    <div className='i-name'>
                        <i className="bi bi-briefcase-fill"></i>
                    </div>
                </div>

                <div className="cards">
                    <span className='span-text'>Pending Jobs</span>
                    <h3 className='short-text'>8</h3>
                    <div className='i-name'>
                        <i className="bi bi-clock-fill clock"></i>
                    </div>
                </div>

                <div className="cards">
                    <span className='span-text'>Completed Jobs</span>
                    <h3 className='short-text'>30</h3>
                    <div className='i-name'>
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                </div>

                <div className="cards">
                    <span className='span-text'>Cancelled</span>
                    <h3 className='short-text'>2</h3>
                    <div className='i-name'>
                        <i className="bi bi-x-circle-fill"></i>
                    </div>
                </div>
            </div>

            <div className='Upcoming_job'>
                <h2 className='Job_Headings'>Upcoming Jobs</h2>

                {[...Array(3)].map((_, index) => (
                    <div className="card_jobs" key={index}>
                        <div className="badge text-dark">Electrical</div>
                        <div className="badge text-bg-warning text-dark">Today 10:00 AM</div>
                        <h4 className='Job_Title'>Electrical Panel Upgrade</h4>
                        <span className='Job_location'>{locationName} - Distance: {distance ? `${distance.toFixed(2)} km` : "Calculating..."}</span>
                        <label>Customer Name: Rajesh</label>
                        <span className='Job_Money'>Estimated Reward: ₹150–300</span>
                        <button type="button" className="btn btn-secondary">View Job</button>
                        <button type="button" className="btn btn-primary">Start Job</button>
                    </div>
                ))}

                <div className="perfomance_continer">
                    <h4 className='perfomance_heading'>Performance Tracker</h4>
                    <div className='perfomance_cards'>
                        <div className="perfomance_card1">
                            <span className='Perfomance_money'>₹3,000</span>
                            <label>Total Rewards Earned</label>
                        </div>
                        <div className="perfomance_card1">
                            <span className='Perfomance_money'>₹300</span>
                            <label>Bonus Earned</label>
                        </div>
                        <div className="perfomance_card1">
                            <span className='Perfomance_money'><i className="bi bi-star-fill"></i> 3.0/5.0</span>
                            <label>Rating</label>
                        </div>
                    </div>

                    <div className="customer_review">
                        <h4 className="customer_heading">Customer Reviews</h4>

                        <div className="customer_cards">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Customer" className='Customer_image' />
                            <div className="star-rating">
                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                <span className='Customer_days'>2 days ago</span>
                            </div>
                            <label className='Customer_text'>
                                "The service was quick and professional — highly satisfied with the electrician's work!"
                            </label>
                        </div>

                        <div className="customer_cards">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Customer" className='Customer_image' />
                            <div className="star-rating">
                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                <span className='Customer_days'>2 days ago</span>
                            </div>
                            <label className='Customer_text'>
                                "I was genuinely impressed with the technician’s punctuality and professionalism. He not only fixed the issue quickly but also explained everything clearly — highly recommended!"
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicalNonDashboard;
