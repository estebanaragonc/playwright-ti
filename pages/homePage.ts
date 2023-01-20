import { expect, Locator, Page } from "@playwright/test";
import { isVisible } from '../common/common-actions';
import util from "util";

export class HomePage {
    readonly page: Page;
  
    private titleTxtSoftwareSection: string;
    private descriptionTxtSoftwareSection: string;
    private serviceLinkSoftwareSection: string;

    private titleTxtInnovativeSection: string;
    private descriptionTxtInnovativeSection: string;
    private serviceLinkInnovativeSection: string;

    private sectionTitleText: string

    private linkButton: string;

    constructor(page: Page) {
        this.page = page;

        this.sectionTitleText =  '(//*[contains(text(), "%s")])[1]';

        this.titleTxtSoftwareSection =  '//h3[contains(text(), "%s")]';
        this.descriptionTxtSoftwareSection =  '//h3[contains(text(), "%s")]//ancestor::div/p';
        this.serviceLinkSoftwareSection =  '//h3[contains(text(), "%s")]//ancestor::a';

        this.titleTxtInnovativeSection =  '//p[@class="service-name white-text"][contains(text(), "%s")]//ancestor::div/p[@class="service-name white-text"]';
        this.descriptionTxtInnovativeSection =  '//p[@class="service-name white-text"][contains(text(), "%s")]//ancestor::div/p[@class="description-service white-text"]';
        this.serviceLinkInnovativeSection = '//p[contains(text(), "%s")]//ancestor::a'
        
        this.linkButton = '//a[contains(text(), "%s")]';
        
    }

    /**
     * To open browser context.
     */
    async open() {
        await this.page.goto('https://www.teaminternational.com/');        
    }

    /**
     * To validate labels and descriptions based on section
     * @param section 'Software solutions' or 'Innovative IT'
     * @param object 
     */
    async validateTitleDescriptionBySection(section: string, object: any) {
        // to validate title
        let titleSelector;
        let descriptionSelector;

        switch (section) {
            case 'Software solutions':
                titleSelector = util.format(this.titleTxtSoftwareSection, object.title);
                descriptionSelector = util.format(this.descriptionTxtSoftwareSection, object.title);
                break;
            case 'Innovative IT':
                titleSelector = util.format(this.titleTxtInnovativeSection, object.title);
                descriptionSelector = util.format(this.descriptionTxtInnovativeSection, object.title);
                break;
            default:
                break;
        }
        await this.page.locator(titleSelector).hover();
        expect.soft(await this.page.locator(titleSelector).textContent(), object.title);                
        await this.page.locator(descriptionSelector).hover();
        expect.soft(await this.page.locator(descriptionSelector).textContent(), object.description);
    }

    /**
     * 
     * @param url To redirect to main page based on section.
     */
    async navigateToPage(url) {
        await this.page.goto('https://www.teaminternational.com/#' + url );
    }

    /**
     * Based on section H2, scroll to view
     * @param section section name (H2)
     */
    async scrollUntilSection(section: string) {
        const linkSelector = util.format(this.sectionTitleText, section);
        //const scroll = await this.page.locator(linkSelector).evaluate((node) => node.scrollIntoView());
        //scroll.evaluate((node) => node.scrollIntoView())
        await Promise.all([this.page.waitForLoadState(), await this.page.locator(linkSelector).evaluate((node) => node.scrollIntoView())]);    
    }

    /**
     * Clicks on se more button for each div present on section.
     * @param section section to validate
     * @param object list of data
     * @param url url to redirect
     */
    async isLinkWorking(section: string, object: any, url) {
        let page = this.page;
        let linkSelector;
        this.navigateToPage(url);
        await page.waitForLoadState();
        switch (section) {
            case 'Software solutions':
                linkSelector = util.format(this.serviceLinkSoftwareSection, object.title);
                break;
            case 'Innovative IT':
                linkSelector = util.format(this.serviceLinkInnovativeSection, object.title);                
                break;
            default:
                break;
        }
        await page.waitForLoadState();
        await this.page.locator(linkSelector).click();
        expect.soft(page.url()).toContain(object.link);
    }

    /**
     * Checks section is loaded
     * @param section section name (h2)
     * @returns 
     */
    async isSectionLoaded(section: string): Promise<boolean> {
        return await isVisible(this.page, `h2:has-text("${section}")`);
    }

    /**
     * Scroll until top gun lab section
     */
    async scrollUntilTopGunLabSection() {
        // Locate the H2 title on the page
        const topGunLab = await this.page.locator('(//*[contains(text(), "Top Gun Lab")])[1]');
        // Scroll the element into view
        await topGunLab.scrollIntoViewIfNeeded();
    }

    /**
     * example of method to click top gun see more
     */
    async clickTopGunLab() {
        let linkSelector = util.format(this.linkButton, 'see more');        
        await Promise.all([this.page.waitForLoadState(), await this.page.locator(linkSelector).hover(), this.page.locator(linkSelector).click(), this.page.waitForLoadState()]);
        expect.soft(this.page.url()).toContain('teaminternational.com');
    }    

    /**
     * click see all offers in the empower your career section
     */
    async clickEmpowerYourCareer() {
        let linkSelector = util.format(this.linkButton, 'see all offers');
        const link = this.page.locator(linkSelector);
        await Promise.all([this.page.waitForLoadState(), await this.page.locator(linkSelector).hover(), this.page.locator(linkSelector).click(), this.page.waitForLoadState()]);
        expect.soft(this.page.url()).toContain('teaminternational');
    }

    /**
     * Click contact form button lcoated on header of main page.
     */
    async clickContactForm() {
        await this.page.getByRole('link', { name: 'Contact Sales' }).click();        
    }
}


