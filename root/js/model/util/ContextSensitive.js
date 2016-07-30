/*
 * Copyright (c) 2016 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
/*global define*/

/**
 * ContextSenstive is a mix-in module that adds the "Contextual Menu" capabilities to an object.
 * @param {Publisher} publisher Extends the object by adding the event generator
 * @returns {ContextSenstive}
 * 
 * @author Bruce Schubert
 */
define([
    'knockout',
    'model/util/Publisher'],
    function (ko, publisher) {
        "use strict";
        
        var ContextSenstive = {
            showContextMenu: function (params) {
                if (this.isContextSenstive()) {
                    this.showMyContextMenu(params);
                }
            },
            /**
             * Adds the the ContextSenstive capabilities to the given object.
             * @param {Object} o The object that will become contextsenstive.
             * @param {Boolean Function()} openCallback The function that performs the edit.
             */
            makeContextSenstive: function (o, contextMenuCallback) {
                // Ensure we don't duplicate 
                if (o.showContextMenu) {
                    return; // o is already context senstive
                }
                // Add the function(s)
                var i;
                for (i in ContextSenstive) {
                    if (ContextSenstive.hasOwnProperty(i) && typeof ContextSenstive[i] === 'function') {
                        if (ContextSenstive[i] === this.makeContextSenstive) {
                            continue;
                        }
                        o[i] = ContextSenstive[i];
                    }
                }
                // Add the properties
                o.isContextSenstive = ko.observable(true);
                o.showMyContextMenu = contextMenuCallback;
                
                // Add the Publisher capability so that events can be generated.
                publisher.makePublisher(o);
            }
        };
        return ContextSenstive;
    }
);

