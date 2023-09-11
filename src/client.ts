import {
  DefaultApiClient,
  ApiConfiguration,
  AuthenticationConfiguration,
  BaseServiceClient,
  LwaServiceClient,
  createUserAgent,
  ApiResponse,
} from "ask-sdk-model-runtime";
import {
  ListMetricsV2RequestOptions,
  ListMetricsV2Response,
  MetricsV2RequestOptions,
  MetricsV2Response,
} from "./models";
import { RefreshTokenConfig } from "ask-smapi-sdk";

const DEFAULT_API_ENDPOINT = "https://api.amazonalexa.com";

const apiConfiguration: ApiConfiguration = {
  apiClient: new DefaultApiClient(),
  apiEndpoint: DEFAULT_API_ENDPOINT,
  authorizationValue: null,
};

export function createClient(
  refreshTokenConfig: RefreshTokenConfig,
  customUserAgent?: string
): CustomSkillManagementServiceClient {
  return new CustomSkillManagementServiceClient(
    apiConfiguration,
    refreshTokenConfig,
    customUserAgent,
  );
}

const errorDefinitions: Map<number, string> = new Map<number, string>([
  [200, "Get analytic metrics report successfully."],
  [400, "Bad request due to invalid or missing data."],
  [
    401,
    "The auth token is invalid/expired or doesn&#39;t have access to the resource.",
  ],
  [403, "The operation being requested is not allowed."],
  [404, "The resource being requested is not found."],
  [
    429,
    "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.",
  ],
  [500, "Internal Server Error."],
  [503, "Service Unavailable."],
]);

export class CustomSkillManagementServiceClient extends BaseServiceClient {
  private lwaServiceClient: LwaServiceClient;
  private userAgent: string;

  constructor(
    apiConfiguration: ApiConfiguration,
    authenticationConfiguration: AuthenticationConfiguration,
    customUserAgent: string = null
  ) {
    super(apiConfiguration);
    this.lwaServiceClient = new LwaServiceClient({
      apiConfiguration,
      authenticationConfiguration,
      grantType: "refresh_token",
    });
    this.userAgent = createUserAgent(
      `${require("../package.json").version}`,
      customUserAgent
    );
  }

  protected async callGetSkillMetricsV2(
    skillId: string,
    options: MetricsV2RequestOptions
  ): Promise<ApiResponse> {
    const accessToken: string = await this.lwaServiceClient.getAccessToken();
    const authorizationValue = "Bearer " + accessToken;

    const headerParams: Array<{ key: string; value: string }> = [
      { key: "Authorization", value: authorizationValue },
      { key: "User-Agent", value: this.userAgent },
    ];

    const pathParams: Map<string, string> = new Map<string, string>([
      ["skillId", skillId],
    ]);

    const resourcePath: string = "/v2/skills/{skillId}/metrics";

    return this.invoke(
      "POST",
      this.apiConfiguration.apiEndpoint,
      resourcePath,
      pathParams,
      null,
      headerParams,
      options,
      errorDefinitions
    );
  }
  async getSkillMetricsV2(
    skillId: string,
    options: MetricsV2RequestOptions
  ): Promise<MetricsV2Response> {
    const apiResponse = await this.callGetSkillMetricsV2(skillId, options);
    return apiResponse.body as MetricsV2Response;
  }

  protected async callGetListMetricsV2(
    options: ListMetricsV2RequestOptions
  ): Promise<ApiResponse> {
    const accessToken: string = await this.lwaServiceClient.getAccessToken();
    const authorizationValue = "Bearer " + accessToken;

    const headerParams: Array<{ key: string; value: string }> = [
      { key: "Authorization", value: authorizationValue },
      { key: "User-Agent", value: this.userAgent },
    ];

    const queryParams = Object.entries(options).map(([key, value]) => ({
      key,
      value,
    }));

    const resourcePath: string = "/v2/skills/metrics";

    return this.invoke(
      "GET",
      this.apiConfiguration.apiEndpoint,
      resourcePath,
      null,
      queryParams,
      headerParams,
      null,
      errorDefinitions
    );
  }

  async getListMetricsV2(
    options: ListMetricsV2RequestOptions
  ): Promise<ListMetricsV2Response> {
    const apiResponse = await this.callGetListMetricsV2(options);
    return apiResponse.body as ListMetricsV2Response;
  }
}
