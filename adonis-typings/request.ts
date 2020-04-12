/**
 * @module @poppinss/request
 */

/*
* @poppinss/request
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

declare module '@ioc:Adonis/Core/Request' {
  import { UrlWithStringQuery } from 'url'
  import { MacroableConstructorContract } from 'macroable'
  import { EncryptionContract } from '@ioc:Adonis/Core/Encryption'
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http'

  /**
   * Shape of the request class instance
   */
  export interface RequestContract {
    parsedUrl: UrlWithStringQuery
    request: IncomingMessage
    response: ServerResponse
    ctx?: HttpContextContract
    id (): string | undefined
    setInitialBody (body: any): void
    updateBody (body: any): void
    updateRawBody (body: string): void
    updateQs (data: any): void
    get (): { [key: string]: any }
    post (): { [key: string]: any }
    original (): { [key: string]: any }
    all (): { [key: string]: any }
    raw (): string | null
    input (key: string, defaultValue?: any): any
    except (keys: string[]): { [key: string]: any }
    only<T extends string, U = { [K in T]: any }> (keys: T[]): U
    method (): string
    intended (): string
    headers (): IncomingHttpHeaders
    header (key: string, defaultValue?: any): string | undefined
    ip (): string
    ips (): string[]
    protocol (): string
    secure (): boolean
    subdomains (): string[]
    hostname (): string | null
    ajax (): boolean
    pjax (): boolean
    url (includeQueryString?: boolean): string
    completeUrl (includeQueryString?: boolean): string
    is (types: string[]): string | null
    accepts <T extends string> (types: T[]): T | null
    types (): string[]
    language <T extends string> (languages: T[]): T | null
    languages (): string[]
    encoding <T extends string> (encodings: T[]): T | null
    encodings (): string[]
    charset <T extends string> (charsets: T[]): T | null
    charsets (): string[]
    hasBody (): boolean
    fresh (): boolean
    stale (): boolean
    cookiesList (): { [key: string]: any }
    cookie (key: string, defaultValue?: any): any
    encryptedCookie (key: string, defaultValue?: any): any
    plainCookie (key: string, defaultValue?: any): any
    hasValidSignature (purpose?: string): boolean
    toJSON (): any
  }

  /**
   * Shape of the request config
   */
  export type RequestConfigContract = {
    secret?: string,
    forceContentNegotiationToJSON?: boolean,
    subdomainOffset: number,
    generateRequestId: boolean,
    allowMethodSpoofing: boolean,
    getIp?: ((request: RequestContract) => string),
    trustProxy: (address: string, distance: number) => boolean,
  }

  /**
   * Shape of request constructor, we export the constructor for others to
   * add macros to the request class. Since, the instance is passed
   * to the http request cycle
   */
  export interface RequestConstructorContract extends MacroableConstructorContract<RequestContract> {
    new (
      request: IncomingMessage,
      response: ServerResponse,
      encryption: EncryptionContract,
      config: RequestConfigContract,
    ): RequestContract
  }

  const Request: RequestConstructorContract
  export default Request
}
