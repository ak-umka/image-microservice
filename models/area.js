import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    address: {
        type: String,
    },
    images: {
        fileId: {
            type: String,
        },
    },
    members: [{
        count: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    violation: [{
        image: {
            fileId: {
                type: String,
            },
        },
        description: {
            type: String,
        },
    }],
    username: {
        type: String,
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    // fullLocation: {
    //     formatted_address: {
    //         type: String,
    //     },
    //     administrative_area_level_2: { 
    //         type: String,
    //     },  //  область
    //     locality: {
    //         type: String,
    //     }, // город
    //     political: {
    //         type: String,
    //     }, // район города
    //     route: {
    //         type: String,
    //     }, // улица
    //     street_number: {
    //         type: String,
    //     }, // номер дома
    // },
    fullLocation: {
        formatted_address: {
            type: String,
        },
        province: {
            type: String,
        },  //  область
        locality: {
            type: String,
        }, //  город
        district: {
            type: String,
        }, // микрорайон
        street: {
            type: String,
        }, // улица
        house: {
            type: String,
        }, // номер дома
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Area", areaSchema);




// alternative fulllcoation
// fullLocation: {
    // formatted_address: {type: String},  // полный адрес
    // street_number: {type: String},  // номер дома
    // route: {type: String}, // улица
    // locality: {type: String}, // город
    // administrative_area_level_2: {type: String}, // район
    // administrative_area_level_1: {type: String},  //  область
// }