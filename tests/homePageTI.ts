import { test, expect } from '@playwright/test';

import staticContent from "../data/staticData";
import { HomePage } from '../pages/homePage';
import { ContactPage } from '../pages/contactPage';

let homepage: HomePage;
let contact: ContactPage

test.beforeEach(async ({ page }) => {  
    homepage = new HomePage(page);
    await homepage.open();
});

test('should check Software Solutions for Your Industry section ', async ({ page }) => {
    
    await test.step(`Checking labels and mouse actions`, async () => {        
        await homepage.scrollUntilSection('Software Solutions for Your Industry');     
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.logistics);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.oil);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.telecom);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.technology);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.financial);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.healthcare);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.travel);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.retail);
        await homepage.validateTitleDescriptionBySection('Software solutions', staticContent.softwareSolutions.digital);
    });
    
    await test.step(`Checking click actions`, async () => {
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.logistics, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.oil, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.telecom, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.technology, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.financial, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.healthcare, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.travel, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.retail, 'industry');
        await homepage.isLinkWorking('Software solutions', staticContent.softwareSolutions.digital, 'industry');

    });

});

test('should check Innovative IT Software Services section ', async ({ page }) => {
    
    homepage = new HomePage(page);

    await test.step(`Checking labels and mouse actions`, async () => {
        await homepage.scrollUntilSection('Innovative IT Software Services');
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.software);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.automation);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.softwareQA);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.microsoft);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.professional);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.data);
        await homepage.validateTitleDescriptionBySection('Innovative IT', staticContent.innovative.managed);
    });

    await test.step(`Checking click actions`, async () => {
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.software, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.automation, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.softwareQA, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.microsoft, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.professional, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.data, 'services');
        await homepage.isLinkWorking('Innovative IT', staticContent.innovative.managed, 'services');
    });

});

test('should check They trust section', async ({ page }) => {
    
    homepage = new HomePage(page);

    await test.step(`Checking section`, async () => {
        await homepage.scrollUntilSection('They trust us');
        const isSectionLoaded = await homepage.isSectionLoaded('They trust us');
        expect(isSectionLoaded).toBeTruthy();
    });            
});


test('should check Top Gun Lab section ', async ({ page }) => {
    
    homepage = new HomePage(page);

    await test.step(`Checking labels and mouse actions`, async () => {
    await homepage.scrollUntilSection('Top Gun Lab');           
    });

    await test.step(`Checking click actions`, async () => {
        await homepage.clickTopGunLab();
    });
});

test('should check Empower Your Career section ', async ({ page }) => {
    homepage = new HomePage(page);

    await test.step(`Checking section`, async () => {
        await homepage.scrollUntilSection('Empower Your Career');
        const isSectionLoaded = await homepage.isSectionLoaded('Empower Your Career');
        expect(isSectionLoaded).toBeTruthy();
    }); 

    await test.step(`Checking click actions`, async () => {
        await homepage.clickEmpowerYourCareer();
    });
});

test('should check Contact Sales section', async ({ page }) => {
    
    homepage = new HomePage(page);
    contact = new ContactPage(page);

    await homepage.open();    
    await homepage.clickContactForm();
    await contact.fillContactForm(staticContent.contactForm);    
});

