/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export declare interface ParsedToken {
  /** Expiration time of the token. */
  exp?: string;
  /** UID of the user. */
  sub?: string;
  /** Time at which authentication was performed. */
  auth_time?: string;
  /** Issuance time of the token. */
  iat?: string;
  /** Firebase specific claims, containing the provider(s) used to authenticate the user. */
  firebase?: {
    sign_in_provider?: string;
    sign_in_second_factor?: string;
  };
  /** Map of any additional custom claims. */
  [key: string]: string | object | undefined;
}

export declare interface UserMetadata {
  /** Time the user was created. */
  readonly creationTime?: string;
  /** Time the user last signed in. */
  readonly lastSignInTime?: string;
}

export declare interface UserInfo {
  /**
   * The display name of the user.
   */
  readonly displayName?: string | null;
  /**
   * The email of the user.
   */
  readonly email?: string | null;
  /**
   * The phone number normalized based on the E.164 standard (e.g. +16505550101) for the
   * user.
   *
   * @remarks
   * This is null if the user has no phone credential linked to the account.
   */
  readonly phoneNumber?: string | null;
  /**
   * The profile photo URL of the user.
   */
  readonly photoURL?: string | null;
  /**
   * The provider used to authenticate the user.
   */
  readonly providerId: string;
  /**
   * The user's unique ID, scoped to the project.
   */
  readonly uid: string;
}

export declare interface IdTokenResult {
  /**
   * The authentication time formatted as a UTC string.
   *
   * @remarks
   * This is the time the user authenticated (signed in) and not the time the token was refreshed.
   */
  authTime: string;
  /** The ID token expiration time formatted as a UTC string. */
  expirationTime: string;
  /** The ID token issuance time formatted as a UTC string. */
  issuedAtTime: string;
  /**
   * The sign-in provider through which the ID token was obtained (anonymous, custom, phone,
   * password, etc).
   *
   * @remarks
   * Note, this does not map to provider IDs.
   */
  signInProvider: string | null;
  /**
   * The type of second factor associated with this session, provided the user was multi-factor
   * authenticated (eg. phone, etc).
   */
  signInSecondFactor?: string | null;
  /** The Firebase Auth ID token JWT string. */
  token: string;
  /**
   * The entire payload claims of the ID token including the standard reserved claims as well as
   * the custom claims.
   */
  claims:
    | ParsedToken
    | {
        [key: string]: any;
      };
}

export declare interface FirebaseUser extends UserInfo {
  /**
   * Whether the email has been verified with {@link sendEmailVerification} and
   * {@link applyActionCode}.
   */
  readonly emailVerified: boolean;
  /**
   * Whether the user is authenticated using the {@link ProviderId}.ANONYMOUS provider.
   */
  readonly isAnonymous: boolean;
  /**
   * Additional metadata around user creation and sign-in times.
   */
  readonly metadata: UserMetadata;
  /**
   * Additional per provider such as displayName and profile information.
   */
  readonly providerData: UserInfo[];

  /**
   * Refresh token used to reauthenticate the user. Avoid using this directly and prefer
   * {@link User.getIdToken} to refresh the ID token instead.
   */
  // readonly refreshToken: string;
  /**
   * The user's tenant ID.
   *
   * @remarks
   * This is a read-only property, which indicates the tenant ID
   * used to sign in the user. This is null if the user is signed in from the parent
   * project.
   *
   * @example
   * ```javascript
   * // Set the tenant ID on Auth instance.
   * auth.tenantId = 'TENANT_PROJECT_ID';
   *
   * // All future sign-in request now include tenant ID.
   * const result = await signInWithEmailAndPassword(auth, email, password);
   * // result.user.tenantId should be 'TENANT_PROJECT_ID'.
   * ```
   */
  // readonly tenantId: string | null;
  /**
   * Deletes and signs out the user.
   *
   * @remarks
   * Important: this is a security-sensitive operation that requires the user to have recently
   * signed in. If this requirement isn't met, ask the user to authenticate again and then call
   * one of the reauthentication methods like {@link reauthenticateWithCredential}.
   */
  delete(): Promise<void>;
  /**
   * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
   *
   * @remarks
   * Returns the current token if it has not expired or if it will not expire in the next five
   * minutes. Otherwise, this will refresh the token and return a new one.
   *
   * @param forceRefresh - Force refresh regardless of token expiration.
   */
  getIdToken(forceRefresh?: boolean): Promise<string>;
  /**
   * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
   *
   * @remarks
   * Returns the current token if it has not expired or if it will not expire in the next five
   * minutes. Otherwise, this will refresh the token and return a new one.
   *
   * @param forceRefresh - Force refresh regardless of token expiration.
   */
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  /**
   * Refreshes the user, if signed in.
   */
  reload(): Promise<void>;
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns A JSON-serializable representation of this object.
   */
  toJSON(): object;

  sendEmailVerification?: () => void | undefined;
}
