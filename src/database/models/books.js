import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection'; // sesuaikan dengan lokasi file sequelize.js Anda

class Books extends Model {}
Books.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // tambahkan atribut lainnya sesuai kebutuhan
}, {
  sequelize,
  modelName: 'Books'
});

export default Books;