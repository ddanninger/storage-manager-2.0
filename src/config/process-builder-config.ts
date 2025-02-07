import { IProcessBuilderConfig } from "src/lib/process-builder/globals/i-process-builder-config";

export default {
    'editable': true,
    'hideDataObjectReferences': false,
    'hideDatabases': true,
    'hideEvents': false,
    'hideGateways': false,
    'hideGroups': true,
    'hidePools': true,
    'hideSubProcesses': true,
    'hideTasks': false,
    'statusConfig': {
        'initialStatus': 'initial',
        'finalStatus': 'final'
    },
    'errorGatewayConfig': {
        'errorConnectionName': 'on error',
        'gatewayName': 'task failed?',
        'successConnectionName': 'on success'
    },
    'dynamicParamDefaultNaming': 'unnamed param',
    'defaultFunctionName': 'unnamed function'
} as IProcessBuilderConfig;