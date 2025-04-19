const fs = require('fs');
const path = require('path');

const requiredFields = [
    'name',
    'description',
    'category',
    'dependencies',
    'author',
    'github',
    'npm',
    'license',
    'tags'
];

const validCategories = [
    'Authentication',
    'Database',
    'Integration',
    'Performance',
    'Security',
    'Storage',
    'UI/UX',
    'Utils',
    'Themes',
    'Plugins',
    'CMS',
    'Content Management',
    'System',
    'Development',
    'Data Storage',
    'Architecture',
    'Data Processing',
    'Documentation',
    'Communication'
];

function validateModule(module, filename) {
    const errors = [];

    for (const field of requiredFields) {
        if (!module[field])
            errors.push(`Missing required field: ${field}`);
    }

    if (module.category && !validCategories.includes(module.category))
        errors.push(`Invalid category: ${module.category}. Must be one of: ${validCategories.join(', ')}`);

    if (module.dependencies && !Array.isArray(module.dependencies))
        errors.push('Dependencies must be an array');

    if (module.tags && !Array.isArray(module.tags))
        errors.push('Tags must be an array');

    if (module.submodules) {
        if (!Array.isArray(module.submodules)) {
            errors.push('Submodules must be an array');
        } else {
            module.submodules.forEach((submodule, index) => {
                if (!submodule.name || !submodule.description || !submodule.packageName) {
                    errors.push(`Submodule ${index} is missing required fields`);
                }
            });
        }
    }

    if (module.moduleImport) {
        if (!module.moduleImport.path)
            errors.push('moduleImport must have a path');

        if(module.moduleImport.modules){
            if (!Array.isArray(module.moduleImport.modules) && typeof module.moduleImport.modules !== 'string')
                errors.push('moduleImport.modules must be an array or a string');
        }

        if(module.moduleImport.providers){
            if (!Array.isArray(module.moduleImport.providers) && typeof module.moduleImport.providers !== 'string')
                errors.push('moduleImport.providers must be an array or a string');
        }
    }

    return errors;
}

function processModules() {
    const dataDir = path.join(__dirname, '_data');
    const outputFile = path.join(__dirname, 'modules.json');
    const modules = [];
    const errors = [];

    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

    files.forEach(file => {
        try {
            const filePath = path.join(dataDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const module = JSON.parse(content);
            const validationErrors = validateModule(module, file);

            if (validationErrors.length > 0) {
                errors.push(`\nValidation errors in ${file}:`);
                validationErrors.forEach(error => errors.push(`  - ${error}`));
                return;
            }

            if (module.deprecated === true) {
                console.log(`Skipping deprecated module: ${module.name}`);
                return;
            }

            modules.push(module);
        } catch (error) {
            errors.push(`\nError processing ${file}:`);
            errors.push(`  - ${error.message}`);
        }
    });

    if (modules.length > 0) {
        fs.writeFileSync(
            outputFile,
            JSON.stringify({ modules }, null)
        );

        console.log(`Successfully processed ${modules.length} modules`);
    }

    if (errors.length > 0) {
        console.error('\nValidation Errors:');
        errors.forEach(error => console.error(error));
        process.exit(1);
    }
}

processModules();
