import React, { useState, useEffect } from 'react';
import NavigableBar from '../new_components/NavigableBar';
import Footer from '../new_components/Footer';
import PickupService from '../Services/pickup.service';
import AuthService from '../Services/auth.service';

const UserDashboard = () => {
    const [formData, setFormData] = useState({
        deviceType: '',
        brand: '',
        model: '',
        condition: '',
        quantity: 1,
        address: '',
        city: '',
        state: '',
        pin: '',
        phone: '',
        remarks: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 1. Get Current User ID
        const currentUser = AuthService.getCurrentUser();
        console.log("Current User from Storage:", currentUser);

        if (!currentUser || (!currentUser.userId && !currentUser.id)) {
            alert("Please login again. User session not found.");
            setLoading(false);
            return;
        }

        const userId = currentUser.userId || currentUser.id;

        // 2. Format Data for Backend (CreatePickupRequestDTO)
        const requestBody = {
            userId: parseInt(userId),
            pickupAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pin}`,
            pickupDate: new Date().toISOString().split('T')[0],
            items: [
                {
                    itemName: `${formData.brand} ${formData.model} (${formData.deviceType})`.trim(),
                    quantity: parseInt(formData.quantity) || 1,
                    remarks: `${formData.condition}: ${formData.remarks || 'No remarks'}`
                }
            ]
        };

        // 3. Send to Backend
        try {
            console.log("Sending Request to Gateway:", requestBody);
            const response = await PickupService.createPickupRequest(requestBody);
            console.log("Backend Response:", response.data);

            alert(`Success! Your request has been submitted. Request ID: ${response.data.requestId || 'N/A'}`);

            // Reset form
            setFormData({
                deviceType: '', brand: '', model: '', condition: '',
                quantity: 1, address: '', city: '', state: '',
                pin: '', phone: '', remarks: ''
            });

        } catch (error) {
            console.error("Full Error Object:", error);
            const serverMsg = error.response?.data?.message || error.message;
            const status = error.response?.status;

            alert(`Submission Failed (${status || 'Network Error'}): ${serverMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f0f2f5' }}>
            <NavigableBar />
            <main className="flex-grow-1 container py-5 mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-11">
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                            {/* Card Header */}
                            <div className="text-center py-5 bg-white border-bottom">
                                <div className="d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3" style={{ backgroundColor: '#e6fffa', color: '#38b2ac' }}>
                                    <i className="bi bi-recycle fs-1"></i>
                                </div>
                                <h2 className="fw-bold mb-1" style={{ color: '#2d3748' }}>Submit E-Waste Request</h2>
                                <p className="text-muted">Fill in the details of your electronic waste for pickup</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 p-md-5 bg-white">
                                <div className="row g-5">
                                    {/* Column 1: Device Information */}
                                    <div className="col-lg-6 pe-lg-5" style={{ borderRight: '1px solid #edf2f7' }}>
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-2 p-2 me-3" style={{ backgroundColor: '#f7fafc' }}>
                                                <i className="bi bi-laptop fs-5" style={{ color: '#319795' }}></i>
                                            </div>
                                            <h5 className="mb-0 fw-bold" style={{ color: '#2d3748' }}>Device Information</h5>
                                        </div>

                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Device Type *</label>
                                                <select name="deviceType" className="form-select border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.deviceType} required>
                                                    <option value="">Select type</option>
                                                    <option value="laptop">Laptop</option>
                                                    <option value="mobile">Mobile Phone</option>
                                                    <option value="monitor">Monitor</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label small fw-semibold text-muted">Brand</label>
                                                <input type="text" name="brand" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} placeholder="Brand" onChange={handleChange} value={formData.brand} />
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label small fw-semibold text-muted">Model</label>
                                                <input type="text" name="model" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} placeholder="Model" onChange={handleChange} value={formData.model} />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Condition *</label>
                                                <select name="condition" className="form-select border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.condition} required>
                                                    <option value="">Condition</option>
                                                    <option value="working">Working</option>
                                                    <option value="non-working">Non-Working</option>
                                                    <option value="damaged">Damaged</option>
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Quantity *</label>
                                                <input type="number" name="quantity" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} value={formData.quantity} onChange={handleChange} required min="1" />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Device Image</label>
                                                <input type="file" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 2: Pickup Details */}
                                    <div className="col-lg-6 ps-lg-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-2 p-2 me-3" style={{ backgroundColor: '#f7fafc' }}>
                                                <i className="bi bi-geo-alt fs-5" style={{ color: '#319795' }}></i>
                                            </div>
                                            <h5 className="mb-0 fw-bold" style={{ color: '#2d3748' }}>Pickup Details</h5>
                                        </div>

                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Address *</label>
                                                <textarea name="address" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} rows="3" placeholder="Street Address" onChange={handleChange} value={formData.address} required></textarea>
                                            </div>

                                            <div className="row g-2 col-12 m-0 p-0">
                                                <div className="col-md-4">
                                                    <label className="form-label small fw-semibold text-muted">City *</label>
                                                    <input type="text" name="city" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.city} required />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small fw-semibold text-muted">State *</label>
                                                    <input type="text" name="state" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.state} required />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small fw-semibold text-muted">Pin *</label>
                                                    <input type="text" name="pin" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.pin} required />
                                                </div>
                                            </div>

                                            <div className="col-12 mt-4">
                                                <label className="form-label small fw-semibold text-muted">Phone *</label>
                                                <input type="tel" name="phone" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} onChange={handleChange} value={formData.phone} required />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label small fw-semibold text-muted">Remarks</label>
                                                <textarea name="remarks" className="form-control border-1 py-2 px-3" style={{ backgroundColor: '#fcfcfc' }} rows="2" onChange={handleChange} value={formData.remarks}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 d-flex justify-content-end gap-3 pt-4">
                                    <button type="button" className="btn btn-outline-secondary px-5" style={{ borderRadius: '4px' }}>Cancel</button>
                                    <button type="submit" className="btn text-white px-5 py-2" style={{ backgroundColor: '#0F766E', borderRadius: '4px' }}>
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;
