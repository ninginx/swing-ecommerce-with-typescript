// eslint-disable-next-line max-classes-per-file
import {
  AuthorizationServiceConfiguration,
  AuthorizationNotifier,
  RedirectRequestHandler,
  AuthorizationRequest,
  AuthorizationResponse,
  BaseTokenRequestHandler,
  TokenRequest,
  GRANT_TYPE_AUTHORIZATION_CODE,
} from '@openid/appauth';
import { NodeRequestor } from '@openid/appauth/built/node_support/node_requestor';
import QueryStringUtils from './queryStringUtils';

if (typeof process.env.NEXT_PUBLIC_AuthorizationEndpoint === 'undefined') {
  throw new Error('環境変数:認証エンドポイントが設定されていません');
}

if (typeof process.env.NEXT_PUBLIC_TokenEndpoint === 'undefined') {
  throw new Error('環境変数:トークンエンドポイントが設定されていません');
}

if (typeof process.env.NEXT_PUBLIC_ClientId === 'undefined') {
  throw new Error('環境変数:Client Idが設定されていません');
}
const config = {
  clientId: process.env.NEXT_PUBLIC_ClientId,
  authorizedCallbackUri: '/signin/callback',
  endpoints: {
    authorization: process.env.NEXT_PUBLIC_AuthorizationEndpoint,
    token: process.env.NEXT_PUBLIC_TokenEndpoint,
  },
};

const queryParser = new QueryStringUtils();
const httpClient = new NodeRequestor();

class AuthService {
  private readonly authServiceConfig = new AuthorizationServiceConfiguration({
    authorization_endpoint: config.endpoints.authorization,
    token_endpoint: config.endpoints.token,
    revocation_endpoint: 'undefined',
  });

  private readonly authNotifier = new AuthorizationNotifier();
  private readonly authRedirectHandler = new RedirectRequestHandler(
    undefined,
    queryParser,
  );

  private readonly tokenRequestHandler = new BaseTokenRequestHandler(
    httpClient,
  );

  private code?: string;
  private codeVerifier?: string;

  constructor() {
    this.authRedirectHandler.setAuthorizationNotifier(this.authNotifier);
    this.authNotifier.setAuthorizationListener(
      (
        request: AuthorizationRequest,
        response: AuthorizationResponse | null,
      ) => {
        if (request.internal && response) {
          this.code = response.code;
          this.codeVerifier = request.internal.code_verifier;
        }
      },
    );
  }

  public authorize = (): void => {
    const { authServiceConfig } = this;
    this.authRedirectHandler.performAuthorizationRequest(
      authServiceConfig,
      new AuthorizationRequest({
        client_id: config.clientId,
        redirect_uri: window.location.origin + config.authorizedCallbackUri,
        response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
        scope: 'openid email',
      }),
    );
  };

  public login = async (): Promise<string> => {
    await this.authRedirectHandler.completeAuthorizationRequestIfPossible();
    const { clientId } = config;
    const { code, codeVerifier } = this;
    // code_verifer
    if (!code || !codeVerifier) {
      throw new Error('Missing code or code_verifier');
    }

    const res = await this.tokenRequestHandler
      .performTokenRequest(
        this.authServiceConfig,
        new TokenRequest({
          client_id: clientId,
          redirect_uri: window.location.origin + config.authorizedCallbackUri,
          code,
          extras: { codeVerifier },
          grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        }),
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed token requesr', err);
        throw err;
      });
    if (typeof res.idToken !== 'string') {
      throw new Error('id tokenが取得できませんでした');
    }

    return res.idToken;
  };
}

export default AuthService;
