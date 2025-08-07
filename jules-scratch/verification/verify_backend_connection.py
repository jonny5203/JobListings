from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:5173")

    # Wait for the message from the backend to be displayed
    message_element = page.locator('p.read-the-docs')
    expect(message_element).to_have_text("Hello from the backend!")

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
