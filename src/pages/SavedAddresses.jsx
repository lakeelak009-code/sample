import { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const SavedAddresses = () => {
  const {
    addresses = [],
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  } = useAuth() || {};

  // 🛑 SAFETY GUARD (prevents blank page)
  if (!Array.isArray(addresses)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading addresses...
      </div>
    );
  }

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });

  const MAX_ADDRESSES = 3;
  const canAddMore = addresses.length < MAX_ADDRESSES;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      addressLine: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      if (!canAddMore) {
        setShowLimitMessage(true);
        setTimeout(() => setShowLimitMessage(false), 3000);
        return;
      }
      addAddress(formData);
    }

    resetForm();
  };

  const handleAddNewClick = () => {
    if (!canAddMore) {
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 3000);
      return;
    }
    setIsAddingNew(true);
  };

  const handleEdit = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    setEditingId(address.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-gray-600 hover:text-black">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Saved Addresses
              </h1>
            </div>

            {!isAddingNew && (
              <button
                onClick={handleAddNewClick}
                disabled={!canAddMore}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  canAddMore
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus size={20} />
                Add New
              </button>
            )}
          </div>

          {/* Limit Info */}
          <div className="flex justify-between bg-gray-50 border rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{addresses.length}</span> of{' '}
              <span className="font-semibold">{MAX_ADDRESSES}</span> addresses saved
            </p>
            {!canAddMore && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                Limit Reached
              </span>
            )}
          </div>

          {showLimitMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ⚠️ You can save only up to 3 addresses.
            </div>
          )}
        </div>

        {/* Add / Edit Form */}
        {isAddingNew && (
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="input" />
              <input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="input" />
              <input required name="addressLine" value={formData.addressLine} onChange={handleInputChange} placeholder="Address" className="input" />
              <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="input" />
              <input required name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="input" />
              <input required name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="input" />

              <div className="flex gap-3">
                <button className="px-6 py-3 bg-black text-white rounded">
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map(address => (
              <div key={address.id} className="bg-white border rounded-lg p-6">
                <h3 className="font-bold">{address.name}</h3>
                <p className="text-sm text-gray-600">{address.addressLine}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state}</p>
                <p className="text-sm font-medium">{address.phone}</p>

                <div className="flex gap-2 mt-3">
                  {!address.isDefault && (
                    <button onClick={() => setDefaultAddress(address.id)} className="btn">
                      <Check size={14} /> Default
                    </button>
                  )}
                  <button onClick={() => handleEdit(address)} className="btn">
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(address.id)} className="btn text-red-600">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-12 text-center">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No saved addresses</p>
            <button onClick={handleAddNewClick} className="mt-4 px-6 py-3 bg-black text-white rounded">
              Add Address
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SavedAddresses;
