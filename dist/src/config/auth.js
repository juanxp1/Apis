"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: process.env.JWT_SECRET || 'Institute_DRD',
        expiresIn: '1d',
    },
};
//# sourceMappingURL=auth.js.map