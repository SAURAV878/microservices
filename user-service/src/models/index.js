import User from "./user.js";
import Database from '../core/database.js';

const models = { User};

Object.keys(models).forEach(modelName => {
    if ( models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { Database, User};

