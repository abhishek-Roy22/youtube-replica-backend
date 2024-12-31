import { connect } from 'mongoose';

const connectToDB = async (url) => {
  try {
    await connect(url);
  } catch (error) {
    throw new Error('Something went wrong', error.message);
  }
};

export default connectToDB;
