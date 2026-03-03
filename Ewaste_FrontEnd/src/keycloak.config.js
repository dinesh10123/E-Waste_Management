import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8085',
    realm: 'ewaste-management',
    clientId: 'ewaste-frontend'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;