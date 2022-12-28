import { default as mongoose } from "mongoose";
import figlet from "figlet";
import { error, notice, pink } from "../index";

/**
 * @Usage Connect into Databasese {@link connectDB}
 */
const connectDB = async () => {
    const uri = (process.env.NODE_ENV === "production") ? (`${process.env.ATLAS_URI}`) : (`${process.env.MONGO_URI}`);

    try {
        const data = await mongoose.connect(uri);

        figlet('MATTIX', (err, text) => {
            if (err) {
                // tslint:disable-next-line:no-console
                console.log('> Something went wrong...');
                // tslint:disable-next-line:no-console
                console.dir(err);
                return;
            }
            // tslint:disable-next-line:no-console
            console.log(pink.blink(text));
        });
        // tslint:disable-next-line:no-console
        console.log(pink.bgWhite.bold.italic("> Connected Successfully to The Database!"));
        // tslint:disable-next-line:no-console
        console.log(notice.bgWhite.bold(`> Database Connected to ${data.connection.host}:${data.connection.port}`));
        // console.log('Connection Details: \n', data);

        await mongoose.connection.on('disconnected', () => {
            // tslint:disable-next-line:no-console
            console.log(error(`> Database Disconnected!`));
        });

        await mongoose.connection.on('connected', () => {
            // tslint:disable-next-line:no-console
            console.log(notice(`Database Reconnected!`));
        });

    } catch (error: any) {
        // tslint:disable-next-line:no-console
        console.log(error(`Error: ${error}`));
    }
};

export default connectDB;
