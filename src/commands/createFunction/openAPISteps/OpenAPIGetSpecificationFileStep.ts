/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { OpenDialogOptions, Uri, workspace } from "vscode";
import { AzureWizardPromptStep } from "vscode-azureextensionui";
import { ext } from "../../../extensionVariables";
import { IFunctionWizardContext } from "../IFunctionWizardContext";

export class OpenAPIGetSpecificationFileStep extends AzureWizardPromptStep<IFunctionWizardContext> {
    public async prompt(context: IFunctionWizardContext): Promise<void> {
        const openDialogOptions: OpenDialogOptions = {
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            title: 'Select OpenAPI (v2/v3) Specification File',
            openLabel: 'Specification File',
            filters: {
                JSON: ['json', 'yaml']
            }
        };

        if (workspace.workspaceFolders) {
            openDialogOptions.defaultUri = Uri.file(workspace.workspaceFolders[0].uri.toString());
        }

        context.openApiSpecificationFile = await ext.ui.showOpenDialog(openDialogOptions);
    }

    public shouldPrompt(context: IFunctionWizardContext): boolean {
        return !!context.generateFromOpenAPI;
    }
}
