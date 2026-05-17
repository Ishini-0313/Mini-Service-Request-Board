const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const JobRequest = require("../models/jobRequestModel");

let token;

beforeEach(async () => {

    // Clear jobs collection
    await JobRequest.deleteMany({});

    // Clear users collection
    await mongoose.connection.collection("users").deleteMany({});

    // Register user
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "John",
            email: "john@test.com",
            password: "123456"
        });

    // Login user
    const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            email: "john@test.com",
            password: "123456"
        });

    token = loginRes.body.token;
});

describe("Job API", () => {

    test("should create a job", async () => {
        const res = await request(app)
            .post("/api/jobs")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Fix Tap",
                description: "Kitchen leaking",
                category: "Plumbing",
                location: "Glasgow",
                contactName: "John",
                contactEmail: "john@test.com"
            });

        expect(res.statusCode).toBe(201);

        expect(res.body.title).toBe("Fix Tap");
    });

    test("should get all jobs", async () => {
        await request(app)
            .post("/api/jobs")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Fix Tap",
                description: "Kitchen leaking",
                category: "Plumbing",
                location: "Glasgow",
                contactName: "John",
                contactEmail: "john@test.com"
            });
        const res = await request(app).get("/api/jobs");

        expect(res.statusCode).toBe(200);

        expect(res.body.length).toBe(1);
    });

    test("should update job status", async () => {
        // Create job first
        const createRes = await request(app)
            .post("/api/jobs")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Fix Tap",
                description: "Kitchen leaking",
                category: "Plumbing",
                location: "Glasgow",
                contactName: "John",
                contactEmail: "john@test.com"
            });

        const jobId = createRes.body._id;

        // Update job
        const res = await request(app)
            .put(`/api/jobs/${jobId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "Closed"
            });

        expect(res.statusCode).toBe(200);

        expect(res.body.status).toBe("Closed");
    });

    test("should delete job", async () => {
        // Create job first
        const createRes = await request(app)
            .post("/api/jobs")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Fix Tap",
                description: "Kitchen leaking",
                category: "Plumbing",
                location: "Glasgow",
                contactName: "John",
                contactEmail: "john@test.com"
            });

        const jobId = createRes.body._id;

        // Delete job
        const res = await request(app)
            .delete(`/api/jobs/${jobId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

});

afterAll(async () => {

    await JobRequest.deleteMany({});

    await mongoose.connection.close();

});