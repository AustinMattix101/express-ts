import * as fs from 'fs';
import https from "https";
import { join } from "path";
import { error, warn } from "../index";

/**
 *
 * @param payload
 * @Usage Use Secure TCP Tunnel Options {@link Onhttps}
 */
async function Onhttps(payload: any) {

    const options = {
        key: fs.readFileSync(join('./server/config/keys/private.pem')),
        cert: fs.readFileSync(join('./server/config/keys/certificate.pem'))
    };

    const secureServer = https.createServer(options, payload);
    const PORT = process.env.SECURE_PORT;
    secureServer.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(warn.bgWhite(`> Secure Socket Layers [SSL] running on PORT: ${PORT} `));
    });

    process.on("unhandleRejection", (err, _promise) => {
        // tslint:disable-next-line:no-console
        console.log(error(`Logged Error: ${err}`));
        secureServer.close(() => process.exit(1));
    });
}

export default Onhttps;