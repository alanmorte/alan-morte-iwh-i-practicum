require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.HUBSPOT_ACCESS_TOKEN;
const OBJECT_TYPE_ID = process.env.HUBSPOT_OBJECT_TYPE_ID || '2-69154354';
const PORT = process.env.PORT || 3000;
const CUSTOM_OBJECT_PROPERTIES = ['name', 'status', 'notes'];

function hubspotHeaders() {
    return {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
}

function customObjectsEndpoint() {
    return `https://api.hubapi.com/crm/v3/objects/${OBJECT_TYPE_ID}`;
}

function customObjectsListUrl() {
    const properties = CUSTOM_OBJECT_PROPERTIES.join(',');
    return `${customObjectsEndpoint()}?properties=${properties}&limit=100`;
}

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    try {
        if (!PRIVATE_APP_ACCESS) {
            return res.render('homepage', {
                title: 'Custom Object Table',
                data: [],
                error: 'HUBSPOT_ACCESS_TOKEN is not set. Copy .env.example to .env and add your private app token locally. Do not commit the token.'
            });
        }

        const resp = await axios.get(customObjectsListUrl(), { headers: hubspotHeaders() });
        const data = resp.data.results;
        res.render('homepage', { title: 'Custom Object Table', data });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).render('homepage', {
            title: 'Custom Object Table',
            data: [],
            error: 'Unable to load practicum_projects records from HubSpot.'
        });
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum.'
    });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {
    const newRecord = {
        properties: {
            name: req.body.name,
            status: req.body.status,
            notes: req.body.notes
        }
    };

    try {
        await axios.post(customObjectsEndpoint(), newRecord, { headers: hubspotHeaders() });
        res.redirect('/');
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).render('updates', {
            title: 'Update Custom Object Form | Integrating With HubSpot I Practicum.',
            error: 'Unable to create the practicum_projects record in HubSpot.',
            values: req.body
        });
    }
});

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));