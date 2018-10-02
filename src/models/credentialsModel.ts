import { Credentials } from "google-auth-library/build/src/auth/credentials";

export class CredentialsModel implements Credentials {
    constructor(access_token: string, refresh_token: string) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    access_token: string;
    refresh_token: string;
}
