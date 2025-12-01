const express = require("express");
const request = require("supertest");
const transactionsRoute = require("./transactionsRoute");

describe("transactionsRoute", () => {
  let app;
  let mockService;

  beforeEach(() => {
    mockService = {
      processPaymentAdjustments: jest.fn(),
    };

    app = express();
    app.use(express.json());
    app.use("/", transactionsRoute(mockService));
  });

  it("should return 204 when service succeeds", async () => {
    mockService.processPaymentAdjustments.mockResolvedValueOnce();

    const response = await request(app).put("/transactions");
    expect(response.status).toBe(204);
    expect(mockService.processPaymentAdjustments).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when service throws", async () => {
    mockService.processPaymentAdjustments.mockRejectedValueOnce(
      new Error("Service error"),
    );

    const response = await request(app).put("/transactions");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: "Service error" });
    expect(mockService.processPaymentAdjustments).toHaveBeenCalledTimes(1);
  });
});
