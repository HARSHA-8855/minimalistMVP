import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  mrp: {
    type: Number,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    enum: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Mask', 'Treatment', 'Toner', 'Baby Care', 'Hair Care'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  additionalImages: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  keyBenefits: {
    type: [String],
    default: [],
  },
  freeFrom: {
    type: [String],
    default: [],
  },
  certifications: {
    type: [String],
    default: [],
  },
  ingredients: {
    type: [String],
    default: [],
  },
  size: {
    type: String,
    default: '',
  },
  variants: {
    type: [{
      size: String,
      price: Number,
      mrp: Number,
      inStock: { type: Boolean, default: true },
    }],
    default: [],
  },
  specialFeatures: {
    type: [String],
    default: [],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);

