export const datasetMeta = {
    2934: { // Energiproducent tælling
        RESTInfo: {
            serviceName: 'ept',
            rootKey: 'selskaber'
        },
        views: [
            {label: 'Kort', type: 'map'}
        ],
        logos: [
            {label: 'Energistyrelsen', link: '', logoId: 1733}
        ],
        dataInfo: {
            dataDescription: 'none',
            sectors: ['Produktion af el', 'Varme']
        },
        mapSettings: {
            mapConstants: {
                center: [12.01010906, 56.05950977],
                extent: [120000, 5900000, 1000000, 6500000],
                resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2],
                matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
            },
            clustering: true,
            visualizationDef: {

            },
            filterDef: [
                {
                    label: 'Filtrer på søgeord',
                    name: 'search',
                    type: 'search',
                    fieldId: '',
                    initValue: ''
                },
                {
                    label: 'År',
                    name: 'vaerk_aar',
                    type: 'multiselect',
                    options: ['2018'],
                    fieldId: 'vaerk_aar',
                    initValue: '_all'
                },
                {
                    label: 'Branche',
                    name: 'branche',
                    type: 'multiselect',
                    options: ['351100 (Produktion af elektricitet)', '353000 (Varmeforsyning)', 'Anden branchekode'],
                    fieldId: 'branche',
                    initValue: '_all'
                },
                {
                    label: 'Hovedbrændselsgruppe',
                    name: 'vaerk_hovedbraendselsgruppe',
                    type: 'multiselect',
                    // options: ['Olie', 'Brændselsfrit', 'Fast biomasse', 'Elektricitet', 'Naturgas', 'Solenergi', 'Affald', 'Kul', 'Biogas', 'Bio-olie', 'Vandkraft', ''],
                    options: [],
                    fieldId: 'vaerk_hovedbraendselsgruppe',
                    initValue: '_all'
                }
            ]
        }
    }
}
export const pageMeta = {
    forside: {
        title: 'Transformer koordinater',
        summary: 'Styrelsen for Dataforsyning og Effektivisering præsenterer en samlet indgang til koordinattransformationer.',
        coverId: 1713,
    },
    datasets: {
        title: 'Oversigt over datasæt',
        summary: 'Du kan her finde en oversigt over datasæt. Udforsk data med de forskellige muligheder for download, visualisering og filtrering. Der er kun få datasæt lige nu, men vi arbejder på at tilføje flere datasæt i fremtiden.',
        coverId: 1725
    },
    about: {
        title: 'Om koordinattransformation',
        summary: '',
        coverId: 1719,
        htmlText: 'Koordinattransformation er et værktøj lavet af Styrelsen for Dataforsyning og Effektivisering. <br />'
    },
    support: {
        title: 'Oversigt over datasæt',
        summary: 'Du kan her finde en oversigt over datasæt. Lige nu kan du finde to datasæt, men vi arbejder på at tilføje flere datasæt i fremtiden.',
        coverId: 1717
    }
}
