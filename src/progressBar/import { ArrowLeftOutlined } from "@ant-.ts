import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Steps,
  Typography,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getConnectURL,
  getConnectionWithMarketplaceWarehouseID,
  getSellerMarketplaceStatus,
} from "../../Api/integration";
import { getSellerID } from "../../services/auth";
import { useAppSelector } from "../../state";
import { sellerSelector } from "../../state/seller/sellerSlice";
import { getErrorFromApi } from "../../utils/helperFunctions";
import { ColorTag } from "../ColorTag/ColorTag";

const { Title, Text, Link } = Typography;

const IntegrationDetails = () => {
  const location = useLocation();
  const integrationData = location.state?.integrationData;
  const newChannel = location.state?.newChannel;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const accessCode: any = searchParams.get("code");
  const encodeDecode: any = searchParams.get("state");
  const [activeStep, setActiveStep] = useState(0);
  const [connectLoading, setConnectLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventoryForm] = Form.useForm();
  const [authForm] = Form.useForm();
  const [channelForm] = Form.useForm();
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>();
  const [accessValue, setAccessValue] = useState(accessCode);
  const { seller } = useAppSelector(sellerSelector);
  const sellerId = getSellerID();
  const [passwordVisible, setPasswordVisible] = useState<any>(false);
  const [newUid, setNewUid] = useState<any>();
  const [newMarketPlace, setNewMarketPlace] = useState<any>(false);
  const [tokenData, setTokenData] = useState<any>();
  const [demo, setDemo] = useState<any>();
  const [demoNew, setDemoNew] = useState<any>();
  console.log("🚀 ~ IntegrationDetails ~ demoNew:", demoNew);
  const [second, setSecond] = useState<any>();
  console.log("🚀 ~ IntegrationDetails ~ second:", second);

  useEffect(() => {
    const channelData = demoNew?.find((item: any) => {
      return (
        item?.marketplace_name === demo &&
        item?.warehouse_id === selectedWarehouse
      );
    });

    console.log("channelData", channelData);

    setSecond(channelData);

    const otherWarehouseIds = demoNew
      ?.filter((item: any) => item?.warehouse_id !== selectedWarehouse)
      .map((item: any) => item?.marketplace_warehouse_id);

    console.log("Other Warehouse IDs", otherWarehouseIds);
  }, [selectedWarehouse, demoNew, demo]);

  const sellerStatus = async () => {
    const payload = {
      marketplace: "MARKETPLACE",
      seller_id: sellerId,
      flipkart: "FLIPKART",
    };
    try {
      const res = await getSellerMarketplaceStatus(payload);

      if (res?.data?.ok) {
        const sellerData = res?.data?.result;
        setDemoNew(sellerData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sellerStatus();
  }, []);

  const handleBackPage = () => {
    navigate("/integration/flipkartList");
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      marketplace: "FLIPKART",
      seller_id: sellerId,
      code: values?.code,
      marketplace_warehouse_id: values?.marketplace_warehouse_id,
      warehouseId: selectedWarehouse,
      uid: newUid,
    };

    try {
      const res = await getConnectionWithMarketplaceWarehouseID(payload);

      if (res?.data?.ok) {
        const formData = res?.data?.result;
        authForm.setFieldsValue({
          app_id: formData?.uid,
          app_secret: formData?.token,
        });
        setTokenData(formData);
        setActiveStep(2);

        if (
          localStorage.getItem("isAuthToken") === "true" ||
          second?.marketplace_warehouse_id !== null
        ) {
          notification.success({
            message: "Connection updated successfully",
          });
        } else {
          notification.success({
            message: "Connection Created successfully",
          });
        }

        localStorage.setItem("isAuthToken", "false");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message;

      if (errorMessage === "Auth token is not generated") {
        setAccessValue("");
        localStorage.setItem("isAuthToken", "true");
        notification.error({
          message: "Error while creating connection",
          description: getErrorFromApi(err),
        });
      } else if (err?.response?.status === 400) {
        notification.error({
          message: "Error while creating Failed",
          description: getErrorFromApi(err),
        });
      } else {
        notification.error({
          message: "Error while creating connection",
          description: getErrorFromApi(err),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const IntegrationStatus: any = {
    NOT_CONNECTED: { name: "Not Connected", color: "#7C7A7A" },
    NOT_CONFIGURED: { name: "Not Configured", color: "#7C7A7A" },
    CONNECTED: { name: "Connected", color: "green" },
  };

  const getRedirectUrl = async (data: any) => {
    setConnectLoading(true);

    const payload = {
      name: data?.channel_name,
      seller_id: sellerId,
      warehouseId: selectedWarehouse,
      params: {
        url: "http://localhost:8200",
      },
    };

    try {
      const res = await getConnectURL(payload);

      if (res?.data?.ok) {
        const urlData = res?.data?.result?.url;

        if (!urlData) return;
        window.open(urlData, "_self");

        // setSellerId(res?.data?.result?.seller_id);
        // setActiveStep(1);
      }
    } catch (err) {
      notification.error({
        message: "Failed to connect.",
        description: getErrorFromApi(err),
      });
    } finally {
      setConnectLoading(false);
    }
  };

  useEffect(() => {
    const appId = authForm.getFieldValue("app_id");
    const appSecret = authForm.getFieldValue("app_secret");

    if (
      (appId && appSecret) ||
      (integrationData?.uid && integrationData?.token)
    ) {
      setActiveStep(3);
    }
  }, [authForm, inventoryForm, integrationData]);

  useEffect(() => {
    if (accessCode) {
      inventoryForm.setFieldsValue({ code: accessCode });
    }
  }, [accessCode, inventoryForm]);

  useEffect(() => {
    if (integrationData?.warehouse_id) {
      setSelectedWarehouse(integrationData?.warehouse_id);
    }
    channelForm.setFieldsValue({
      channel_name: integrationData?.marketplace_name,
    });
    inventoryForm.setFieldsValue({
      marketplace_warehouse_id: integrationData?.marketplace_warehouse_id,
    });

    authForm.setFieldsValue({
      app_id: integrationData?.uid,
      app_secret: integrationData?.token,
    });
  }, [integrationData, channelForm, authForm]);

  useEffect(() => {
    if (encodeDecode) {
      try {
        const decodedState = atob(encodeDecode);
        const parts = decodedState.split("$$$");
        const marketplace = parts[7];
        const warehouseIdNew = +parts[6];
        const warehouseUid = parts[0];
        setNewUid(warehouseUid);
        setSelectedWarehouse(warehouseIdNew);
        setDemo(marketplace);
        channelForm.setFieldsValue({
          channel_name: marketplace,
        });
      } catch (error) {
        console.error("Failed to decode state parameter:", error);
      }
    }
  }, [encodeDecode, channelForm, seller]);

  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 16,
        height: "calc(100vh - 153px)",
        overflow: "scroll",
      }}
      className="integration-details-card"
      title={
        <Space>
          <Link onClick={handleBackPage}>
            <ArrowLeftOutlined style={{ color: "black" }} />
          </Link>
          Flipkart
        </Space>
      }
      headStyle={{ background: "#E6EAF550" }}
      extra={
        <Space>
          <Select
            allowClear
            style={{ width: 250 }}
            placeholder="Select warehouse"
            onSearch={(searchValue: any) => {
              setSelectedWarehouse(searchValue);
            }}
            showSearch
            optionFilterProp="label"
            options={seller?.sellerWarehouse?.map((warehouse: any) => ({
              label: warehouse?.warehouse_name,
              value: warehouse?.warehouse_id,
            }))}
            onChange={(value) => {
              setSelectedWarehouse(value);
              channelForm.resetFields();
              inventoryForm.resetFields();
              authForm.resetFields();
              setAccessValue("");
              setSearchParams("");
              setActiveStep(0);
            }}
            value={selectedWarehouse}
          />
          <img src="/assets/images/logos/flipkart.svg" alt="Flipkart logo" />
        </Space>
      }
    >
      <Row
        justify="space-between"
        gutter={[16, 16]}
        className="steps-container"
      >
        <Col xs={24} md={24} xl={14}>
          <Steps
            direction="vertical"
            style={{ marginTop: "20px" }}
            className="customSteps"
            current={activeStep}
          >
            <Steps.Step
              title={
                <Row
                  justify="space-between"
                  align={"middle"}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Title level={5} style={{ margin: 0 }}>
                      Flipkart Seller Panel
                    </Title>
                  </Col>
                  <Col>
                    <ColorTag
                      color={
                        accessValue ||
                        (integrationData?.token && integrationData?.uid)
                          ? IntegrationStatus?.["CONNECTED"]?.color
                          : IntegrationStatus?.["NOT_CONNECTED"]?.color
                      }
                    >
                      {accessValue ||
                      (integrationData?.token && integrationData?.uid)
                        ? IntegrationStatus?.["CONNECTED"]?.name
                        : IntegrationStatus?.["NOT_CONNECTED"]?.name}
                    </ColorTag>
                  </Col>
                </Row>
              }
              description={
                <>
                  <Col span={24}>
                    <Text>
                      Please enter channel name and connect your seller account
                    </Text>
                  </Col>
                  <Form
                    layout="vertical"
                    onFinish={getRedirectUrl}
                    disabled={!selectedWarehouse}
                    form={channelForm}
                  >
                    <Row gutter={[24, 24]}>
                      <Col xs={24} sm={4} lg={12}>
                        <Form.Item
                          style={{ marginTop: 10 }}
                          name="channel_name"
                          label="Channel Name"
                          rules={[
                            {
                              required: true,
                              message: "channel name is required.",
                            },
                          ]}
                        >
                          <Input
                            disabled={
                              integrationData?.marketplace_name ||
                              activeStep === 2 ||
                              accessValue
                            }
                            placeholder="Enter channel name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={4}>
                        {!(integrationData?.token && integrationData?.uid) && (
                          <Button
                            style={{ marginTop: 39, width: 200 }}
                            block
                            size="middle"
                            type="primary"
                            loading={connectLoading}
                            htmlType="submit"
                            disabled={!selectedWarehouse || accessValue}
                          >
                            {accessValue ? " Connected" : "Connect"}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </>
              }
            />

            <Steps.Step
              title={
                <Row
                  justify="space-between"
                  align={"middle"}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Title level={5} style={{ margin: 0 }}>
                      Flipkart Inventory Panel
                    </Title>
                  </Col>
                  <Col>
                    <ColorTag
                      color={
                        activeStep === 2 ||
                        activeStep === 3 ||
                        (integrationData?.token && integrationData?.uid)
                          ? IntegrationStatus?.["CONNECTED"]?.color
                          : IntegrationStatus?.["NOT_CONNECTED"]?.color
                      }
                    >
                      {activeStep === 2 ||
                      activeStep === 3 ||
                      (integrationData?.token && integrationData?.uid)
                        ? IntegrationStatus?.["CONNECTED"]?.name
                        : IntegrationStatus?.["NOT_CONNECTED"]?.name}
                    </ColorTag>
                  </Col>
                </Row>
              }
              description={
                <Form
                  form={inventoryForm}
                  layout="vertical"
                  onFinish={handleSubmit}
                  disabled={!selectedWarehouse}
                >
                  <Row>
                    <Col span={24}>
                      <Row gutter={[16, 16]} justify={"end"}>
                        <Col span={24}>
                          <Form.Item
                            name="marketplace_warehouse_id"
                            label="Location ID"
                            rules={[
                              {
                                required: true,
                                message: "Location id is required.",
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              disabled={
                                integrationData?.marketplace_warehouse_id ||
                                activeStep === 2
                              }
                              placeholder="Enter Location ID"
                            />
                          </Form.Item>
                        </Col>

                        {!(integrationData?.token && integrationData?.uid) && (
                          <Col span={24}>
                            <Form.Item
                              name="code"
                              label="Access Code"
                              rules={[
                                {
                                  required: true,
                                  message: "Access code is required.",
                                },
                              ]}
                              style={{ marginBottom: 0 }}
                            >
                              <Space direction="horizontal">
                                <Input
                                  type={passwordVisible ? "text" : "password"}
                                  style={{ width: 535 }}
                                  placeholder="Enter Access Code"
                                  disabled
                                  value={accessValue}
                                />
                                <Button
                                  type="primary"
                                  style={{ width: 80 }}
                                  disabled={!accessValue}
                                  onClick={() =>
                                    setPasswordVisible(
                                      (prevState: any) => !prevState
                                    )
                                  }
                                >
                                  {passwordVisible ? "Hide" : "Show"}
                                </Button>
                              </Space>
                            </Form.Item>
                          </Col>
                        )}

                        {!(integrationData?.token && integrationData?.uid) && (
                          <Col>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={
                                  !selectedWarehouse || activeStep === 2
                                }
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Form>
              }
            />

            <Steps.Step
              title={
                <Row
                  justify="space-between"
                  align={"middle"}
                  style={{ marginBottom: 10 }}
                >
                  <Col>
                    <Title level={5} style={{ margin: 0 }}>
                      Authorization Details
                    </Title>
                  </Col>
                  <Col>
                    <ColorTag
                      color={
                        activeStep === 3 ||
                        (integrationData?.token && integrationData?.uid) ||
                        activeStep === 2
                          ? IntegrationStatus?.["CONNECTED"]?.color
                          : IntegrationStatus?.["NOT_CONNECTED"]?.color
                      }
                    >
                      {activeStep === 3 ||
                      (integrationData?.token && integrationData?.uid) ||
                      activeStep === 2
                        ? IntegrationStatus?.["CONNECTED"]?.name
                        : IntegrationStatus?.["NOT_CONNECTED"]?.name}
                    </ColorTag>
                  </Col>
                </Row>
              }
              description={
                <Form
                  form={authForm}
                  layout="vertical"
                  // onFinish={handleSubmit}
                  disabled
                >
                  <Row>
                    <Col span={24}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Form.Item
                            name="app_id"
                            label="Application ID"
                            rules={[
                              {
                                required: true,
                                message: "Application id is required.",
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Input placeholder="Enter Application ID" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="app_secret"
                            label="Application Secret"
                            rules={[
                              {
                                required: true,
                                message: "Application secret is required.",
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Space direction="horizontal">
                              <Input
                                type={newMarketPlace ? "text" : "password"}
                                style={{
                                  width: integrationData?.token ? 625 : 535,
                                }}
                                placeholder="Enter Application Secret"
                                disabled
                                value={
                                  integrationData?.token || tokenData?.token
                                }
                              />
                              {!(
                                integrationData?.token && integrationData?.uid
                              ) && (
                                <Button
                                  type="primary"
                                  style={{ width: 80 }}
                                  disabled={!tokenData?.token}
                                  onClick={() =>
                                    setNewMarketPlace(
                                      (prevState: any) => !prevState
                                    )
                                  }
                                >
                                  {newMarketPlace ? "Hide" : "Show"}
                                </Button>
                              )}
                            </Space>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              }
            />
          </Steps>
        </Col>
      </Row>
    </Card>
  );
};

export default IntegrationDetails;
