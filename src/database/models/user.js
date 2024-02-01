import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection'; // sesuaikan dengan lokasi file sequelize.js Anda

class User extends Model {}
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // tambahkan atribut lainnya sesuai kebutuhan
}, {
  sequelize,
  modelName: 'User'
});

export default User;