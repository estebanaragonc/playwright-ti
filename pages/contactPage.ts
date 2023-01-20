import { FrameLocator, expect } from '@playwright/test';
import type { Page } from 'playwright';

export class ContactPage {
    readonly page: Page;

    private firstNameLabel: string;
    private lastNameLabel: string;
    private companyLabel: string;
    private emailLabel: string;
    private phoneLabel: string;
    private messageLabel: string;
    private privacyCheck: string;    
    private submitButton: string;    

    private contactFrame: FrameLocator;


    /**
     * Construct page-object-model
     * @param page 
     */
    constructor(page: Page) {
        this.page = page;
        this.firstNameLabel = 'input[data-id="firstName"]';
        this.lastNameLabel = 'input[data-id="lastName"]';
        this.companyLabel = 'input[data-id="company"]';
        this.emailLabel = 'input[data-id="email"]';
        this.phoneLabel = 'input[data-id="phone"]';
        this.messageLabel = 'input[data-id="message"]';
        this.privacyCheck = '.checkmark';        
        this.submitButton =  '//input[@class="submit-button"]';        

        this.contactFrame = page.frameLocator('#mobile-contact-form >> internal:attr=[title="Candidates Form"i]');
    }

    /**
     * Fill required laberls on contact form.
     * @param object 
     */
    async fillContactForm(object: any ) {
        await this.contactFrame.locator(this.firstNameLabel).first().click();
        await this.contactFrame.locator(this.firstNameLabel).first().fill(object.firstName);
        await this.contactFrame.locator(this.lastNameLabel).first().fill(object.lastName);
        await this.contactFrame.locator(this.companyLabel).first().fill(object.company);
        await this.contactFrame.locator(this.emailLabel).first().fill(object.email);
        await this.contactFrame.locator(this.phoneLabel).first().fill(object.phone);
        await this.contactFrame.locator(this.messageLabel).first().fill(object.message);
        await this.contactFrame.locator(this.privacyCheck).first().click();
        await this.contactFrame.locator(this.submitButton).first().click();
        expect(await this.contactFrame.getByText('THANK YOU FOR CONTACTING US!').click()).toBeTruthy;            
    }
}
