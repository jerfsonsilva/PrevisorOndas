describe('Beach forecast function test', () => {
	it('should return a forecast with true', async ()=> {
		const { body, status } = await global.testRequest.get('/forecast')
		expect(status).toBe(200)
		expect(body).toEqual({result: true})
	})
})