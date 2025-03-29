<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/cli"><img src="https://img.shields.io/npm/v/@cmmv/cli.svg" alt="NPM Version" /></a>
    <a href="https://github.com/cmmvio/cmmv-cli/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/cli.svg" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv-cli/issues">Report Issue</a>
</p>


# Description

This repository serves as a centralized catalog of all modules and plugins available for CMMV (Contract-Model-Model-View), both official and community-created.

## How to List Your Module

To list your module in the catalog, you need to create a JSON file in the `_data` directory with your module's name. For example: `_data/your-module.json`

### JSON File Format

```json
{
    "name": "@cmmv/your-module",
    "description": "Description of your module",
    "category": "Category",
    "dependencies": ["@cmmv/your-module"],
    "documentation": "https://cmmv.io/docs/modules/your-module",
    "author": "Your Name",
    "github": "https://github.com/your-username/your-module",
    "npm": "https://www.npmjs.com/package/@cmmv/your-module",
    "license": "MIT",
    "tags": ["tag1", "tag2"],
    "beta": false,
    "submodules": [
        {
            "name": "Submodule 1",
            "installed": false,
            "description": "Description of the submodule",
            "packageName": "package-name"
        }
    ],
    "moduleImport": {
        "import": ["ModuleName", "ProviderName"],
        "path": "@cmmv/your-module",
        "modules": ["ModuleName"],
        "providers": ["ProviderName"]
    }
}
```

### Required Fields

- `name`: NPM package name
- `description`: Module description
- `category`: Module category
- `dependencies`: List of dependencies
- `documentation`: Link to documentation
- `author`: Author name
- `github`: GitHub repository link
- `npm`: NPM package link
- `license`: Module license
- `tags`: Array of tags for categorization

### Optional Fields

- `beta`: Indicates if the module is in beta (default: false)
- `submodules`: Array of available submodules
- `moduleImport`: Configuration for how CMMV should inject the module

### Submodules

Submodules are optional and allow you to define different implementations or adapters for your module. For example, the Repository module can have submodules for different databases:

```json
"submodules": [
    {
        "name": "MySQL",
        "installed": false,
        "description": "MySQL adapter for Repository",
        "packageName": "@cmmv/repository-mysql"
    },
    {
        "name": "PostgreSQL",
        "installed": false,
        "description": "PostgreSQL adapter for Repository",
        "packageName": "@cmmv/repository-postgres"
    }
]
```

### Import Configuration

The `moduleImport` field defines how CMMV should inject the module into the project:

```json
"moduleImport": {
    "import": ["ModuleName", "ProviderName"],
    "path": "@cmmv/your-module",
    "modules": ["ModuleName"],
    "providers": ["ProviderName"]
}
```

- `import`: Names of modules/providers to be imported
- `path`: NPM package path
- `modules`: List of modules to be registered
- `providers`: List of providers to be registered

## How to Contribute

1. Fork this repository
2. Create a JSON file for your module in the `_data` directory
3. Follow the format specified above
4. Submit a Pull Request with your changes

## Available Categories

- Authentication
- Database
- Integration
- Performance
- Security
- Storage
- UI/UX
- Utils
- Themes
- Plugins
- CMS

## Support

For more information about creating modules for CMMV, please refer to our [official documentation](https://cmmv.io/docs).
